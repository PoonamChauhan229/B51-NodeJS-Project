const bcrypt=require('bcryptjs')
console.log("1")
const myFunction=async()=>{
   const password="Red12345!" 
   const salt =await bcrypt.genSalt(10)
   const hashedPassword=await bcrypt.hash(password,8)

   const hashedSaltPassword=await bcrypt.hash(password,salt)
   console.log(password)
   console.log(hashedPassword)
   console.log(hashedSaltPassword)

   const isMatch=await bcrypt.compare(password,hashedPassword)
   console.log(isMatch)
}
myFunction()
