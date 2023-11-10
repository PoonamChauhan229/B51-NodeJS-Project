const jwt=require('jsonwebtoken')
// jwtsecretkey
const myFunction=async()=>{
    const token=jwt.sign({_id:"123456"},'abc')
    console.log("Token is",token)
    const data=jwt.verify(token,'abc')
    console.log("data is",data)
}
myFunction()