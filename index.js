const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fupload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const studentRouter = require('./routes/StudentsRoutes')
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fupload());

const PORT = 5000;
DB_URL='mongodb://localhost:27017/ead'


app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');



mongoose.connect(DB_URL).then(res=>{
    console.log("Connected to db")
}).catch(err=>{
    console.log(err)
})

app.use(studentRouter)

app.listen(PORT,()=>{
    console.log("listening to port")
})