const mongoose = require('mongoose');


const NewRole = new mongoose.Schema({
   
    roleName:{
        type: String,
        required: true
        },
    roleDescribtion:{
        type: String,
        required: true
        },
    Activation:{
        type: Number,
        enum: [0 , 1],
        default: 0
    },
    Read:{
        type: Number,
        enum: [0 , 1],
        default: 0
    },
    Write:{
        type: Number,
        enum: [0 , 1],
        default: 0
    },
    Update:{
        type: Number,
        enum: [0 , 1],
        default: 0
    },
    Delete:{
        type: Number,
        enum: [0 , 1],
        default: 0
    },
    superUser:{
        type: Number,
        enum: [0 , 1],
        default: 0
    },
    Page:[{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Role', NewRole)