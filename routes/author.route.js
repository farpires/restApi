const { Router }  = require('express');
const router = Router();
const _ = require('lodash');
const authors = require('../author.json');
const books = require('../book.json');

//GET - authors
router.get('/authors',(req,res)=>{
    res.json(authors);  
});


//POST - save author
router.post('/authors',(req,res)=>{
    const { name, lastname } = req.body;//request client
    if(name && lastname ){
        const newAuthor = {...req.body};//request client
        authors.push(newAuthor);
        res.json({'added': 'ok'})
    }else{
        res.status(400).json({'statusCode':'Bad Request'}); // not valido
    }
});

//PUT - modify author
router.put('/authors/:id', (req, res)=>{
    const id = req.params.id;//request de la url
    const { name, lastname } = req.body;//request client
    _.each(authors,(author)=>{
        if(author.id == id){
            author.name=name;
            author.lastname=lastname;
        }
    });
    res.json({'modified':'ok'});
});

//DELETE -author
router.delete('/authors/:id',(req, res) => {
    const id = req.params.id;//request de la url
    let bandera=true;
    books.map((book)=>{
        if(book.authorId==id){
            bandera=false;
        }
    });
    if(bandera){
        _.remove(authors,(author) => {
            return author.id == id
        })
    }else{
        console.log("Error: author cont a book");
        res.status(400).json({'statusCode':'Bad Request'}); // not valido
    }
    res.json(authors);
});

module.exports = router;