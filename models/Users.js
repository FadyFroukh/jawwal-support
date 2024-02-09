const mongoose = require('mongoose');
const moment = require('moment');


const specificDate = new Date();
const now = moment(specificDate).format('YYYY-MM-DD HH:mm')

const NewUser = new mongoose.Schema({
    Username:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    userID:{
        type:Number,
        required:true
    },
    employeeId:{
        type:Number,
        required:true
    },
    Role:{
        type: String,
        default: 'noRole'
    },
    Activation:{
        type: Number,
        enum: [0, 1],
        default: 0
    },
    superUser:{
        type:Number,
        enum:[0,1],
        default : 0
    },
    creationTime:{
        type: String,
        default: now
    },
    createdBy:{
        type:String,
        required:true
    },
    lastLogin:{
        type: String,
        default: 'Never'
    },
});

module.exports = mongoose.model('User', NewUser)