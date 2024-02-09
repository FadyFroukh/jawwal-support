const jwt = require('jsonwebtoken');
const Role = require('../models/Role')
const Access = require('../models/Role')
const {ObjectId} = require('mongoose').Types

var key = 'Proenigineer'


const roleChecker = (expectedRole) => (req, res, next) => {
  const token = req.header('Authorization');


  if (!token) {
      return res.status(403).send('No token found');
  }

  var mainToken = token.split(' ')[1]

  try {
      const user = jwt.verify(mainToken, key);

      if (user.role === expectedRole) {
          next();
      } else {
          return res.status(403).send('Authentication failure: User does not have the required role');
      }
  } catch (error) {
      return res.status(401).send('Invalid token');
  }
};

const Username = () => (req, res, next) => {
  const token = req.header('Authorization');


  if (!token) {
      return res.status(403).send('No token found');
  }

  var mainToken = token.split(' ')[1]

  try {
      const user = jwt.verify(mainToken, key);

      return user.uid
  } catch (error) {
      return res.status(401).send('Invalid token');
  }
};


const Pageaccess = (allowOperations, pages, superuser) => async (req, res, next) => {
  const token = req.header('Authorization');


  if (!token) {
      return res.status(403).send('No token found');
  }

  var mainToken = token.split(' ')[1]

  try {
      const user = jwt.verify(mainToken, key);

      var role = user.role;


      var roleName = superuser ? await Role.findOne({"_id": new ObjectId(role),"Activation":"1","superUser": superuser ? 1 : 0}) : await Role.findOne({"_id": new ObjectId(role),"Activation":"1"})

      if(!roleName){
        return res.status(403).send('This role is not exit');
      }

      const pagesx = pages.every((pg) => roleName.Page.includes(pg));

     const checkop = allowOperations.every((op) => roleName[op] === 1)

      if(checkop && pagesx){
        next()
      }else{
        return res.status(403).send('Authentication failure: User does not have the required role');
      }

  } catch (error) {
    console.log("error", error);
      return res.status(401).send('Application error');
  }
};

module.exports = {
  roleChecker: roleChecker,
  Pageaccess: Pageaccess,
  Username: Username
};