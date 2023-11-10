const mongoose =require('mongoose')

//define the model:
const Task=mongoose.model('Task',{
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'//Model Name which exported
    }
    //we will get the Object Id of user who was authenticated
    //peice of code will link task to the owner/user
})

module.exports=Task