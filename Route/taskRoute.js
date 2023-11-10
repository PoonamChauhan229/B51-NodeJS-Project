const express=require('express')
const User=require('../Model/userModel')
const Task=require('../Model/taskModel')
const router=express.Router()
const Joi=require('joi')
const bcrypt=require('bcryptjs')
const auth=require('../middleware/auth')

// Add Task
// router.post('/task',async(req,res)=>{  
//     console.log(req.user)  
//    const taskData=new Task(req.body)
//     try{
//         await taskData.save()
//         res.send(taskData)
//     }catch(e){res.send({message:e})}
// })
// add ||edit-update ||delete
// req.params.id
//user=>login=> task creadted with his IDs
//get task=> only that particluar user task should reflect


router.post('/task',auth,async(req,res)=>{  
    console.log(req.user)  
   const taskData=new Task({
    ...req.body,
    owner:req.user._id
   })
    try{
        await taskData.save()
        res.send(taskData)
    }catch(e){res.send({message:e})}
})

// Task Route for add ||edit-update ||delete

// Get All Task of all the users
router.get('/task',async(req,res)=>{
    // FROM DB
    // Find
    try{
        const getAllTask=await Task.find({})//ModelName.MethodName()
        res.send(getAllTask)
    }catch(e){res.send({message:e})}
})

// Get All Task of specifc users
router.get('/usertask',auth,async(req,res)=>{
    // FROM DB
    // Find
    try{
        //const getAllTask=await Task.find({})//ModelName.MethodName()
        await req.user.populate('taskRel')
        res.send(req.user.taskRel)
    }catch(e){res.send({message:e})}
})

// Task by id
router.get('/task/:id',auth,async(req,res)=>{
    // FROM DB
    // Find
    //res.send(req.params.id)
    try{
        const getTask=await Task.findOne({_id:req.params.id,owner:req.user._id})//ModelName.MethodName()
        if(!getTask){
            res.send({message:"Task Not Found"})
        }       
        res.send(getTask)
    }catch(e){res.send({message:e})}
})

//update the users|| PUT/PATCH Method

router.patch('/task/:id',auth,async(req,res)=>{
    // FROM DB
    // Find
    //res.send(req.params.id)
    try{
        const updateTask=await Task.findOneAndUpdate({_id:req.params.id,owner:req.user._id},req.body,{new:true,runValidators:true})//ModelName.MethodName()       
        res.send(updateTask)
    }catch(e){res.send({message:e})}
})

//delete the users
router.delete('/task/:id',auth,async(req,res)=>{
    // FROM DB
    // Find
    //res.send(req.params.id)
    try{
        const DeleteTask=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})//ModelName.MethodName()       
        res.send(DeleteTask)
    }catch(e){res.send({message:e})}
})


module.exports=router