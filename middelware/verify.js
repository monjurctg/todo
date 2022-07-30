const ProjectModel = require("../models/ProjectModel")
const userModel = require("../models/UserModel")


const permissionCheck = async(req,res,next)=>{
    const projectId = req.params.id
    const project = await ProjectModel.find({_id:projectId})
    let permission = project[0].users.find(user=>user._id==req.body.userId)
    if(permission){
       next()
    }
    res.status(500).json({status:"error",error:"you have no permission "})
    
}

 const check =async(req,res,next)=>{
    const projectId = req.params.id
    const user = await userModel.find({_id:req.body.userId})
    const project = await ProjectModel.find({_id:projectId})
    let permission = project[0].users.find(user=>user._id==req.body.userId)
    
    if(project.length>0 && user.length>0 ){
        console.log(project)
        next()
    }
    else if(project.length==0){
        res.status(500).json({status:"error",error:"project not found"})
    }
    else if(user.length==0){
        res.status(500).json({status:"error",error:"user not found"})
    }
   
}
module.exports={
    check,permissionCheck
}