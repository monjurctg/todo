const { AddProject, deleteProject, allProjects ,addTodo, deleteTodo, addUserInProject, removeUserFromProject} = require('../controlers/Project')
const auth = require('../middelware/auth')
const { check, permissionCheck } = require('../middelware/verify')


const router = require('express').Router()


router.post("/add-project",AddProject)
router.delete('/project/remove/:id',deleteProject)
router.get('/all-project', allProjects)
router.post('/add-todo/:id',auth,check,permissionCheck,addTodo)
router.delete('/remove-todo/:id',auth,deleteTodo)
router.post('/add-projectUser/:id',auth,check,addUserInProject)
router.delete('/remove-projectUser/:id',auth,removeUserFromProject)





module.exports = router
