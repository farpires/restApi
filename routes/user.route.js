const { Router } = require('express');
const router = Router();
const Request = require('Request');

router.get('/users',(req,res)=>{
    Request.get("https://jsonplaceholder.typicode.com/users",(error,response,body)=>{
        if(error){
            return console.log(error);
        }
        res.json(JSON.parse(body));
    })
})
module.exports = router;