const { Router }  = require('express');
const router = Router();
const _ = require('lodash');
const movies = require('../sample.json');

//GET - movies
router.get('/movies',(req,res)=>{
    res.json(movies);  
});

//POST - save movies
router.post('/movies',(req,res)=>{
   const { title, director, year, rating } = req.body;//request client
   if(title && director && year && rating){
        const newMovie = {...req.body};//request client
        movies.push(newMovie);
        res.json({'added': 'ok'})
   }else{
       res.status(400).json({'statusCode':'Bad Request'}); // not valido
   }
});
//DELETE -movie
router.delete('/movies/:id',(req, res) => {
    const id = req.params.id;//request de la url
    _.remove(movies,(movie) => {
        return movie.id == id
    })
    res.json(movies);
});

router.put('/movies/:id', (req, res)=>{
    const id = req.params.id;//request de la url
    const { title, director, year, rating } = req.body;//request client
    _.each(movies,(movie)=>{
        if(movie.id == id){
            movie.title=title;
            movie.director=director;
            movie.year=year;
            movie.rating=rating;    
        }
    });
    res.json({'modified':'ok'});
});


module.exports = router;