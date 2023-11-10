const jwt=require('jsonwebtoken')
const User=require('../Model/userModel')

const auth=async(req,res,next)=>{
    console.log("auth middleware")
// Authorization: Bearer token
    // const token=req.header('Authorization')
    const token=req.header('Authorization').replace("Bearer ","")
    //console.log(token)
    // verify
    const decoded=jwt.verify(token,'thisismycourse')
    //console.log(decoded)// id of the user
    const user=await User.findOne({_id:decoded._id})
    //console.log(user)
    req.token=token,
    req.user=user
    next();
}
module.exports=auth