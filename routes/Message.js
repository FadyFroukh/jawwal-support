const express = require('express');
const router = express.Router();
const Messages = require("../models/Messages");

router.post('/fetch' , async (req,res) =>{
    const {userId,adminId} = req.body;

    try {
        var data = await Messages.find({userId,adminId});

        if(data.length > 0){
            res.status(200).send(data)
        }else{
            res.status(200).send([])
        }
    } catch (error) {
        console.log("Error", error);
        res.status(500).send('Application error')
    }
});

router.post('/' , async (req,res) =>{

    const {text,userId,adminId,sentBy} = req.body;

    try {
        let msg = new Messages({
            text,
            userId,
            adminId,
            sentBy
        })

        msg.save();

    } catch (error) {
        console.log("Error", error);
        res.status(500).send('Application error')
    }
});

module.exports = router;