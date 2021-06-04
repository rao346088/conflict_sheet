
let Users = require('../Users.json')
const stringify = require("json-stringify-pretty-compact");
const verifyToken = require('../middleware/verifyToken')
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const fs = require("fs");


/*----------------------LOGIN METHODS-----------------------------------------------*/

router.get('/',verifyToken, (req, res)=>{
  console.log("login verify",res.body)
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
  console.log("UserData.email",UserData.email)     
 console.log("login api", UserData.email)              
  let DBUser = Users.find(c=> c.email === UserData.email)
 
      if (!DBUser)
       {   console.log("user not found")
           res.status(404).send(`user with given email ${req.body.email} not found`)
       }
    
   else
    { 
      console.log("DBUser", DBUser) 
      if (DBUser.password !== UserData.password)
         
      {
        console.log("password mismatch")
        res.status(401).send('Invalid Password')}
      else
      {
       let payload = {subject: DBUser}
       let token = jwt.sign(payload, 'secretKey')
       let logData = {"token": ' ', "Role": ' '}
       logData.token=token
       logData.Role= DBUser.Role
        console.log("logData",logData)
         
        res.header('x-auth-token',token).status(200).send({logData})
        console.log("token",token)
      }
    }  
      console.log("dbuser",DBUser)
  
    });

    module.exports = router;