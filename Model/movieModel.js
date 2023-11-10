const mongoose = require("mongoose");

// Define the movie schema
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  poster: { type: String, required: true },
  rating: { type: Number, required: true },
  summary: { type: String, required: true },
  trailer: { type: String, required: true },
});

// Create the movie model based on the schema
const Movie = mongoose.model("Movie", movieSchema);
module.exports=Movie
