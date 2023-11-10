const express=require('express')
const User=require('../Model/userModel')
const router=express.Router()
const Joi=require('joi')
const bcrypt=require('bcryptjs')
const auth=require('../middleware/auth')

// Signup Route
router.post('/users/signup',async(req,res)=>{
    const schema = Joi.object({
        name: Joi.string(),
        age:Joi.number(),
        email:Joi.string(),
        password:Joi.string()
    });
    const {error}=schema.validate(req.body)
    if(error) return res.send({message:error.details[0].message})

    // duplication
    let user=await User.findOne({email:req?.body?.email})
    if(user) return res.send({message:"User Already Exists"})

    //hashing of the password:
    const salt =await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)

   user=new User({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        password:hashedPassword
    })
    // console.log(req.body)
    // 
    try{
        await user.save()
        const token=await user.generateAuthToken()
        // console.log(token)
        res.send({user,token})
    }catch(e){res.send({message:e})}

})


//SignIN Route
router.post('/users/signin',async(req,res)=>{
    const schema = Joi.object({
        email:Joi.string(),
        password:Joi.string()
    });
    const {error}=schema.validate(req.body)
    if(error) return res.send({message:error.details[0].message})

    // duplication
    let user=await User.findOne({email:req?.body?.email})
    if(!user) return res.send({message:"User Not Found"})

    //comparision of the password:
    // const isValidPassword=await bcrypt.compare(req?.body?.password,user.password)
    // console.log(req.body.password,user.password)
    // console.log(isValidPassword)
    // if(!isValidPassword) return res.send({message:"Password Didnt Matched"})

    try{
        const token=await user.generateAuthToken()
        // console.log(token)
        res.send({user,token})
    }catch(e){res.send({message:e})}

})

router.get('/users/me',auth,async(req,res)=>{       
    try{       
        res.send(req.user)
    }catch(e){res.send({message:e})}
})

//update the users|| PUT/PATCH Method

router.patch('/users/me',auth,async(req,res)=>{
    // FROM DB
    // Find
    //res.send(req.params.id)
    try{
        const updateUsers=await User.findByIdAndUpdate(req.user._id,req.body,{new:true,runValidators:true})//ModelName.MethodName()
       
        res.send(updateUsers)
    }catch(e){res.send({message:e})}
})

//delete the users
router.delete('/users/me',auth,async(req,res)=>{
    
    try{
        const DeleteUsers=await User.findByIdAndDelete(req.user._id)//ModelName.MethodName()       
        res.send(DeleteUsers)
    }catch(e){res.send({message:e})}
})
module.exports=router