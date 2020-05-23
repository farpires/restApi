const { Router }  = require('express');
const router = Router();
const _ = require('lodash');
const authors = require('../author.json');
const books = require('../book.json');

// //GET - books solution1
// router.get('/booksaut',(req,res)=>{
//     let bookandauthor;
//     let combinancion2;
//     books.map((book)=>{  
//         authors.map((author)=>{
//         if(book.authorId ==author.id){
//             bookandauthor = [{
//                 "id": book.id,
//                 "name": book.name,
//                 "name_author": author.name,
//                 "lastname_author": author.lastname,
//             }]
//             combinancion2=[...bookandauthor,combinancion2];
//         }
//         });
//     });
//     res.json(combinancion2); 
    
// });

// //GET - books solucion2 
// router.get('/booksaut1',(req,res)=>{
//    _.each(books,(book)=>{
//        _.each(authors,(author)=>{
//            if(author.id==book.authorId){
//             book.authorId=[author]
//            }
//        })
//    })
//     res.json(books);  
// });

// //GET - books  //SOLUCION DEFINITIVA
router.get('/booksaut2',(req,res)=>{
    authors.map((author)=>{
    _.each(books,(book)=>{
            if(book.authorId ==author.id){
                book.authorId=[author]
            }
    })
    });
    res.json(books); 
});


//GET - books
router.get('/books',(req,res)=>{
    res.json(books);  
});

//POST - save book
router.post('/books',(req,res)=>{
    const { name, authorId } = req.body;//request client
    if(name && authorId ){
         const newBook = {...req.body};//request client
         books.push(newBook);
         res.json({'added': 'ok'})
    }else{
        res.status(400).json({'statusCode':'Bad Request'}); // not valido
    }
});

//PUT - modify books
router.put('/books/:id', (req, res)=>{
    const id = req.params.id;//request de la url
    const {  name, authorId} = req.body;//request client
    _.each(books,(book)=>{
        if(book.id == id){
            book.name=name;
            book.authorId=authorId;
        }
    });
    res.json({'modified':'ok'});
});

//DELETE -books
router.delete('/books/:id',(req, res) => {
    const id = req.params.id;//request de la url
    _.remove(books,(book) => {
        return book.id == id
    })
    res.json(books);
});


module.exports = router;