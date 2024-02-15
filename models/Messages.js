const mongoose = require('mongoose');


const Messages = new mongoose.Schema({
    text: {
        type:String,
        required:true,
    },
    userId: {
        type:String,
        required:true
    },
    adminId:{
        type:String,
        required:true
    },
    sentBy:{
        type:String,
        required:true
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Messages', Messages)