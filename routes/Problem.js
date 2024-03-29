const express = require('express');
const Problems = require('../models/Problems');
const router = express.Router();
const {roleChecker, Pageaccess} = require('../config/auth');

router.get('/', Pageaccess(['Read'], ['Post']) ,async (req,res) =>{
    try {
        var data = await Problems.find({})

        if(data.length > 0){
            res.status(200).send(data)
        }else{
            res.status(200).send('Collection is null')
        }
    } catch (error) {
        console.log("Error", error);
        res.status(500).send('Application error')
    }
});

router.post('/' ,Pageaccess(['Write'], ['Post']) ,(req,res) =>{
    const {problemTitle,problemDescription,createdBy,postSteps,videoLink} = req.body;
    
    let errors = []

    if(!problemTitle || !problemDescription || !createdBy){
        errors.push('Error please fill all records')
    }

    if(errors.length > 0){
        res.status(400).send(errors.toString())
    }else{ 
        try {
            var newProblem = new Problems({
                problemTitle,
                problemDescription,
                createdBy,
                postSteps,
                videoLink
            });

            newProblem.save().then(() =>{
                res.status(201).send({msg:"Problem created successfuly"})
            })
        } catch (error) {
            res.status(500).send('Application Error')
        }
    }
})


router.put('/:id', Pageaccess(['Update'], ['Post']) , async (req, res) => {
    const { id } = req.params;
  
    try {
      const existingProblem = await Problems.findById(id);
  
      if (!existingProblem) {
        return res.status(404).send('Problem not found');
      }
  
      const updateObject = {};
      const updateFields = ['problemTitle', 'problemDescription','postSteps','videoLink'];
  
      updateFields.forEach(field => {
        if (req.body[field] !== undefined && req.body[field] !== null) {
          updateObject[field] = req.body[field];
        }
      });
  
      const updatedProblem = await Problems.findByIdAndUpdate(id, updateObject);
  
      if (!updatedProblem) {
        return res.status(500).send('Failed to update problem');
      }
  
      res.status(200).send({msg:"Problem Updated"});
    } catch (error) {
      res.status(500).send('Application error' + error);
    }
});


router.delete('/:id', Pageaccess(['Delete'], ['Post']), async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProblem = await Problems.findByIdAndDelete(id);
  
      if (!deletedProblem) {
        return res.status(404).send('Post not found');
      }
  
      res.status(200).send({msg:"Problem deleted successfully"});
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).send('Internal Server Error');
    }
});

router.put("/options/:id", async (req,res)=>{
  const {id} = req.params;

  const {operation,userId} = req.body;

  try {

    const editedProblems = await Problems.findById(id);

    if (!editedProblems) {
      return res.status(404).send('Post not found');
    }
    
    if (operation === 'save'){
      if (editedProblems.likes.find(like=>like.userId === userId)){
        await Problems.findByIdAndUpdate(id,{
          likes:editedProblems.likes.filter(like=>like.userId !== userId)
        }).then(data=>{
          res.send(data);
        }).catch(err=>{
          console.error('Error Editing post:', error);
          res.status(500).send('Internal Server Error');      
        })
      }else {
        await Problems.findByIdAndUpdate(id,{
          $push: { likes: {userId,rating:3}}
        }).then(data=>{
          res.send(data);
        }).catch(err=>{
          console.error('Error Editing post:', error);
          res.status(500).send('Internal Server Error');      
        })
      }
    }else if (operation === 'report'){
      await Problems.findByIdAndUpdate(id,{
        numberOfReported:editedProblems.numberOfReported + 1
      }).then(data=>{
        res.send(data);
      }).catch(err=>{
        console.error('Error Editing post:', error);
        res.status(500).send('Internal Server Error');      
      })
    }else {
      await Problems.findByIdAndUpdate(id,{
        numberOfBlocks:editedProblems.numberOfBlocks + 1
      }).then(data=>{
        res.send(data);
      }).catch(err=>{
        console.error('Error Editing post:', error);
        res.status(500).send('Internal Server Error');      
      })
    }
  } catch (error) {
    console.error('Error Editing post:', error);
    res.status(500).send('Internal Server Error');
  }

});

router.get('/saved/:id', Pageaccess(['Read'], ['Post']) ,async (req,res) =>{

  const {id} = req.params;

  try {
      var data = await Problems.find({});

      var problems = data?.likes?.filter(like=>like.userId === id);

      console.log(problems);

      if(data.length > 0){
          res.status(200).send(problems)
      }else{
          res.status(200).send('Collection is null')
      }
  } catch (error) {
      console.log("Error", error);
      res.status(500).send('Application error')
  }
});

module.exports = router;