const express = require('express');
const Role = require('../models/Role')
const router = express.Router()
const {superUser, Pageaccess} = require('../config/auth')

router.get('/', Pageaccess(['Read'], ['Role'], true) ,async (req,res) =>{
    try {
        var data = await Role.find({})

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

router.post('/', Pageaccess(['Write'],['Role'], true),async (req,res) =>{
    const {roleName, roleDescribtion} = req.body

    try {
        if(!roleName){
            res.status(400).send('Please fill the role name')
        }

        const newRole = new Role({
            roleName,
            roleDescribtion
        })

        newRole.save().then(() =>{
            res.status(201).send('Role is created');
        })
    } catch (error) {
        res.status(500).send('Application error')
    }
})

router.put('/:id', Pageaccess(['Update'],['Role'], true), async (req, res) => {
    const { id } = req.params;
  
    try {
      const existingPost = await Post.findById(id);
  
      if (!existingPost) {
        return res.status(404).send('Post not found');
      }
  
      const updateObject = {};
      const updateFields = ['jobTitle', 'jobDescription', 'startDate', 'endDate', 'salary', 'companyId', 'educationLevel', 'status', 'yearsExp'];
  
      updateFields.forEach(field => {
        if (req.body[field] !== undefined && req.body[field] !== null) {
          updateObject[field] = req.body[field];
        }
      });
  
      const updatedPost = await Post.findByIdAndUpdate(id, updateObject);
  
      if (!updatedPost) {
        return res.status(500).send('Failed to update post');
      }
  
      res.status(200).send(updatedPost);
    } catch (error) {
      res.status(500).send('Application error' + error);
    }
});


router.delete('/:id', Pageaccess(['Delete'],['Role'], true), async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
  
      if (!deletedPost) {
        return res.status(404).send('Post not found');
      }
  
      res.status(200).send('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router