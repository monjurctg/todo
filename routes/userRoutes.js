const express = require("express");
const { addUser, changePassword, getUsers, loginUser, getAlluser } = require("../controlers/userControlers");
const auth = require("../middelware/auth");
const router = express.Router();


// post user
router.post("/register",addUser)
router.post('/login',loginUser)
// router.get("/allUsers", getUsers)
router.get('/allUsers/:id',getAlluser)
router.put('/change-password',changePassword)



module.exports = router