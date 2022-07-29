const ProjectModel = require("../models/ProjectModel")


 const isInProject =async(req,res,next)=>{
    const projectId = req.params.id
    const project = await ProjectModel.find({_id:projectId})
    if(project.length>0){
        console.log(project)
        next()
    
    }
    else{
        res.status(500).json({status:"error",error:"project not found"})
    }
}
module.exports={
    isInProject
}