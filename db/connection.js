const mongoose=require('mongoose')

const connection=async()=>{
        await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true
    })
    console.log("Mongodb is connected")
    }
    module.exports=connection;
// mongodb+srv://username:password@cluster0.lukkhw2.mongodb.net/dbname

