const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('../routes/index')

app.use(express.urlencoded({extended : false}));//avility compresion json
app.use(express.json());
app.use(morgan('dev'));

app.use(router);

app.listen(3000,()=>{
    console.log(`server listen on port ${3000}`);
})