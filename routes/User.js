const express = require('express');
const router = express.Router()
const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Pageaccess} = require('../config/auth')
const moment = require('moment');

var key = 'Proenigineer'

router.get('/allusers',Pageaccess(['Read'],['Users'], true),async (req,res) =>{
    try {
        var data = await User.find({});
  
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send('Data is null')
        }
    } catch (error) {
        res.status(500).send('Application Error' + error)
    }
  });
  
  router.get('/profile/:uname',Pageaccess(['Read'],['Users'], true),async (req,res) =>{
    const {uname} = req.params
    try {
        var data = await User.findOne({"Username": uname});
  
        if(data){
            res.status(200).send({
              "username": data.Username,
              "lastlogin": data.lastLogin,
              "email": data.Email,
              "company": data.companyId
            })
        }else{
            res.status(404).send('Data is null')
        }
    } catch (error) {
        res.status(500).send('Application Error' + error)
    }
  });
  
  
  router.post('/newuser' ,async (req,res) =>{
      const {Username,Password,Email,userID,employeeId,createdBy,Role,Activation,superUser} = req.body
  
      let errors = [];
  
      if (!Username || !Email || !Password) {
          errors.push({ 'message': 'Please fill all fields' });
      }
      
     var checkUser = await User.findOne({ "Username": Username })
  
     if (checkUser) {
      errors.push({ 'message': 'The username is already taken' });
      }
      
  
      if(errors.length > 0){
          res.status(400).send(errors[0])
      }else{
          var newPassword = await bcrypt.hash(Password, 10)
  
          try {
              var newUser = new User({
                  Username,
                  Email,
                  Password:newPassword,
                  userID,
                  employeeId,
                  createdBy,
                  Role,
                  Activation,
                  superUser
              })
      
              newUser.save().then(() =>{
                  res.status(201).send({msg:"User is created successfully"})
              })
          } catch (error) {
              console.log("Error", error);
              res.status(400).send('Please fill all records')
      
          }
      }
   
  })
  
  
  router.post('/login', async (req, res) => {
    const { Username, Password } = req.body;
    let errors = [];
  
    if (!Username || !Password) {
      errors.push('Please fill in both username and password');
    }
  
      try {
          const user = await User.findOne({ 'Username': Username })
      
          if (user) {
            const passwordMatch = await bcrypt.compare(Password, user.Password);
      
            if (passwordMatch) {
              if(user.Activation === 1){
  
                const specificDate = new Date();
                const now = moment(specificDate).format('YYYY-MM-DD HH:mm')
  
                User.findByIdAndUpdate({"_id": user._id},{"$set":{"lastLogin": now}}).then(() =>{
                  console.log("Last Login Date Updated");
                });
                var superx = user.superUser === 1 ? true : false
                var token = jwt.sign({'uid': user.Username, 'role': user.Role, 'lastLogin': user.lastLogin, "superUser": superx},key, {expiresIn: '3h'})
                res.send(token);
              }else{
                res.status(403).send('Account is disabled')
              }
           
            } else {
              errors.push('Incorrect password');
            }
          } else {
            errors.push('Username not found');
          }
      
          if (errors.length > 0) {
            res.send(errors);
          }
        } catch (error) {
          console.error('Error during login:', error);
          res.status(500).send('Internal Server Error');
        }
   
  });
  

router.put('/editUser/:id' ,async (req,res) =>{
    const {id,Username,Password,Email,userID,employeeId,Activation,Role} = req.body
    
    await User.findByIdAndUpdate(id,{
      Username,Password,Email,userID,employeeId,Activation,Role
    }).then(data=>{
      res.send({msg:"Edited User"});
    }).catch(err=>{
      console.error('Error during editing user:', err);
      res.status(500).send('Internal Server Error');
    })
})

   
router.delete('/deleteUser/:id' ,async (req,res) =>{
    const {id} = req.params
    
    await User.findByIdAndDelete(id).then(data=>{
      res.send({msg:"Deleted User"});
    }).catch(err=>{
      console.error('Error during deleting user:', err);
      res.status(500).send('Internal Server Error');
    })
})
  
  module.exports = router;