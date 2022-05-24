const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }
})

module.exports= mongoose.model('Student',StudentSchema);