// importing
const dotenv=require('dotenv')
dotenv.config()
const connection=require('./db/connection')
connection()
const userRouter=require('./Route/userRouter')
const taskRouter=require('./Route/taskRoute')
const movieRouter=require('./Route/movieRoute')
const express=require('express')


const app=express()
const PORT=process.env.PORT || 8000;

app.use(express.json())
// saving the to DB=> posting the data=> POST method

// Router
app.use(userRouter)
app.use(taskRouter)
app.use(movieRouter)



// Install Postman


// listen to PORT
app.listen(PORT,()=>{
    console.log("Server Started at PORT no:",PORT)
})

