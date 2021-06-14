let Users = require('../Users.json')
const stringify = require("json-stringify-pretty-compact");
const verifyToken = require('../middleware/verifyToken')
const jwt = require('jsonwebtoken');
const config = require('config')
const express = require('express')
const router = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt")

router.post('/',verifyToken, async (req,res)=>{
    let RegisterData = req.body
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password,salt)
    RegisterData.password = hashed
    Users.push(RegisterData)
  
   fs.writeFile("./Users.json", stringify(Users), err => {
    if (err) throw err;
    else
     console.log("Done writing"); // Success

     let payload = {subject: RegisterData}
     let token = jwt.sign(payload, config.get('secretkey'))
      res.status(200).send({token})
    });
}) 

module.exports = router;