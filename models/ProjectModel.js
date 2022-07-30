const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    projectName:{
        type:String,
    },
    todos:[{
        name:String,
        description:String,
        owner:Object,
        status:Boolean
    }],

    users:{
        type:Array,  
        default:[]

    },
})

const ProjectModel = mongoose.model('Project',ProjectSchema);

module.exports = ProjectModel