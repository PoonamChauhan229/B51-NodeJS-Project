const express=require('express')
const router=express.Router()
const Movie=require('../Model/movieModel')

// Route to create a new movie
router.post('/movies', async (req, res) => {
    const newMovie=new Movie(req.body)
  
    try { 
    await newMovie.save();
      res.send(newMovie)
    } catch (error) {
      res.send({ message: error.message });
    }
  });

// Route to get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    res.send({ message: error.message });
  }
});

// Route to find a movie by ID
router.get('/movies/:id', async (req, res) => {
    try {
      const findmovie = await Movie.findById(req.params.id)
      if (!findmovie) {
        return res.status(404).send({ message: 'Movie not found' });
      }
      res.send(findmovie);
    } catch (error) {
      res.send({ message: error.message });
    }
  });

// Route to update a movie by ID
router.patch('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body,{ new: true,runValidators:true})
    if (!updatedMovie) {
      return res.status(404).send({ message: 'Movie not found' });
    }
    res.send(updatedMovie);
  } catch (error) {
    res.send({ message: error.message });
  }
});

// Route to delete a movie by ID
router.delete('/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params._id);
    if (!deletedMovie) {
      return res.status(404).send({ message: 'Movie not found' });
    }
    res.send({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

