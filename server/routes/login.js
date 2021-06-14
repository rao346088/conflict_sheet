
let Users = require('../Users.json')
const stringify = require("json-stringify-pretty-compact");
const verifyToken = require('../middleware/verifyToken')
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const fs = require("fs");

router.get('/',verifyToken, (req, res)=>{
    let log1Data={email: ' ' , Role: ' '}
    log1Data.email=res.body.email
    log1Data.Role= res.body.Role
    res.json({log1Data})
})

router.post('/', (req, res) => {
    
  let UserData = req.body
  UserData = {id : Users.length +1 ,
  email: req.body.email,
  password: req.body.password}
  
  let DBUser = Users.find(c=> c.email === UserData.email)
 
  if (!DBUser)
     {   console.log("user not found")
         res.status(404).send(`user with given email ${req.body.email} not found`)
     }
    
  else
    { if (DBUser.password !== UserData.password)
      {
         res.status(401).send('Invalid Password')}
      else
      {
       let payload = {subject: DBUser}
       let token = jwt.sign(payload, 'secretKey')
       let logData = {"token": ' ', "Role": ' '}
       logData.token=token
       logData.Role= DBUser.Role
       res.header('x-auth-token',token).status(200).send({logData})
      }
    }  
      
    });

    module.exports = router;