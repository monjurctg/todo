const mongoose = require('mongoose')
const { Schema } = mongoose;

const TodoSchema = new Schema({
    name:{
        type:String,
       
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    }

})