const { AddProject, deleteProject, allProjects ,addTodo, deleteTodo, addUserInProject, removeUserFromProject} = require('../controlers/Project')
const { isInProject } = require('../middelware/checkInProject')


const router = require('express').Router()


router.post("/add-project",AddProject)
router.delete('/project/remove/:id',deleteProject)
router.get('/all-project', allProjects)
router.post('/add-todo/:id',isInProject,addTodo)
router.delete('/remove-todo/:id',deleteTodo)
router.post('/add-projectUser/:id',addUserInProject)
router.delete('/remove-projectUser/:id',removeUserFromProject)





module.exports = router
