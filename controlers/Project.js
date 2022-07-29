const ProjectModel = require('../models/ProjectModel')
const userModel = require('../models/UserModel')

const AddProject = async (req, res) => {
  const { projectName } = req.body
  if (!projectName) {
    res
      .status(500)
      .json({ status: 'error', error: 'Please Write a project name' })
  }
  try {
    const result = await new ProjectModel({ projectName }).save()
    console.log(result, 'result')

    res.status(200).json({ result })
  } catch (err) {
    res.send(err)
  }
}

const allProjects = async (req, res) => {
  const result = await ProjectModel.find({})
  res.json({ data: result })
}

const deleteProject = async (req, res) => {
  console.log(req)
  const id = req.params.id
  const result = await ProjectModel.deleteOne({ _id: id })
  res.status(200).json({ status: 'ok', result })
}

const addTodo = async (req, res) => {
  const { userId, name, description } = req.body
  const user = await userModel
    .find({ _id: userId })
    .select(['email', 'username', '_id', 'myProjects'])
  user.password = ''
  try {
    await ProjectModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          todos: { name: name, description: description, owner: user[0] },
        },
      },

      { upsert: true },
      (err, docs) => {
        if (err) {
          res.send(err)
        }
        res.json({ status: 'succes', message: 'todo add successfully' })
      },
    ).clone()

    await userModel.findByIdAndUpdate(
      userId,
      { $push: { todos: { name: name, description: description } } },
      { upsert: true },
      (err,docs)=>{
        if(!err){
            console.log(docs,"user")
        }
      }
    ).clone()
  } catch (err) {
    console.log(err)
  }
  // project push in user
}

const deleteTodo = async (req, res) => {
  const { userId, name } = req.body
  const user = await userModel.find({ _id: userId })

  user.password = ''
  await ProjectModel.findByIdAndUpdate(
    req.params.id,
    { $pull: { todos: { name: name } } },
    { safe: true },
    function (err, docs) {
      if (!err) {
        res.json({ status: 'succes' })
      }
    },
  ).clone()
}

const addUserInProject = async (req, res) => {
  const { userId } = req.body
  const user = await userModel.find({ _id: userId })
  const project = await ProjectModel.find({ _id: req.params.id })
  if (project.length > 0) {
    let updateUserModel = await userModel.findByIdAndUpdate(
      req.params.id,

      { $push: { myProjects: project[0] } },

      { upsert: true },
    )
    console.log(updateUserModel)
  }

  let updatedProject = await ProjectModel.findByIdAndUpdate(
    req.params.id,

    { $push: { users: user[0] } },

    { upsert: true },
  )

  res.send(updatedProject)
}

const removeUserFromProject = async (req, res) => {
  const { userId } = req.body
  const user = await userModel.find({ _id: userId })
  let updatedModel = await ProjectModel.findByIdAndUpdate(
    req.params.id,

    { $pull: { users: user._id } },

    { safe: true },
  )
  console.log(updatedModel)
  res.send(updatedModel)
}

module.exports = {
  AddProject,
  deleteProject,
  allProjects,
  addTodo,
  deleteTodo,
  removeUserFromProject,
  addUserInProject,
}
