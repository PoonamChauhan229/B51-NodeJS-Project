const mongoose=require('mongoose')
// movie SChema

const movieSchema=new mongoose.Schema({
    name:{type:String,required:true},
    poster:{type:String,required:true},
    rating:{type:Number,required:true},
    summary:{type:String,required:true},
    trailer:{type:String,required:true},
})

const Movie=mongoose.model('Movie',movieSchema)
module.exports=Movie;