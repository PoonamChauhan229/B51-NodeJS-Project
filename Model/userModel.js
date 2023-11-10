const mongoose =require('mongoose')
const validator = require('validator');
const jwt=require('jsonwebtoken')
//define the model:

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    age:{
        type:Number,
        default:16,
        validate(value){
            if(value<15) throw new Error("Age must be greater than 15")
        }
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Email Address Not Valid")
        }
    },
    password:{
        type:String,
        minLength:8,
        lowercase:true,
        required:true,
        validate(value){
            if(value.includes("password")) throw new Error("Password should not contain password")
        }

    },    
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

// Use Methods=> userSchema
userSchema.methods.generateAuthToken=async function(req,res,next){
    //
    const user=this
    //generate a token,
    const token=jwt.sign({_id:user._id.toString()},'thisismycourse')
    user.tokens= user.tokens.concat({token:token})
    console.log(token)
    await user.save()
    return token;
}

userSchema.virtual('taskRel',{
    ref:'Task',//Task Model
    localField:'_id',//user id/ object id of user,
    foreignField:'owner'
})

//virtual('movieRel')
const User=mongoose.model('User',userSchema)
module.exports=User