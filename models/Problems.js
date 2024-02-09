const mongoose = require('mongoose');
const moment = require('moment');


const specificDate = new Date();
const now = moment(specificDate).format('YYYY-MM-DD HH:mm')

const Problems = new mongoose.Schema({
    problemTitle:{
        type:String,
        required:true
    },
    problemDescription:{
        type:String,
        required:true
    },
    creationTime:{
        type: String,
        default: now
    },
    createdBy:{
        type:String,
        required:true
    },
    likes:{
        type:Array(),
        default:[]
    },
    numberOfAdds:{
        type:Number,
        default : 0,
    },
    numberOfReported:{
        type:Number,
        default : 0
    },
    numberOfBlocks:{
        type:Number,
        default : 0
    },
});

module.exports = mongoose.model('Problems', Problems)