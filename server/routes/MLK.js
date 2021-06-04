let MasterLookup = require('../MasterLookup.json')
const stringify = require("json-stringify-pretty-compact");
const verifyToken = require('../middleware/verifyToken')
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const fs = require("fs");


/*-------------------------MASTER-LOOKUP METHODS--------------------*/

router.get('/',(req, res)=>{
  console.log("MasterLookupxx",res.body)
  res.json(MasterLookup)
})
 
 router.post('/',verifyToken,(req,res)=>{
 
 console.log("Masterlookup post")
 let UserMasterLookup= req.body
 MasterLookup.push(UserMasterLookup)
 fs.writeFile("./MasterLookup.json", stringify(MasterLookup), err=>{
   if(err) throw err;
   else
   res.send(UserMasterLookup)
 });   
});

router.put('/:id',verifyToken, (req,res) => {
   let MLData = MasterLookup.find(c=> c.id ===parseInt(req.params.id));
   if (!MLData) {res.status(404).send('object with given id not found' );}
    
   MasterLookup=MasterLookup.filter(o=>o.id !==MLData.id)
   MLData=req.body
   MasterLookup.push(MLData)
   fs.writeFile("./MasterLookup.json", stringify(MasterLookup), err => {
       // Checking for errors
   if (err) throw err;
   else
    console.log("Done writing"); // Success
   res.send(MLData)
   });

})
    
router.delete('/:id',verifyToken, (req,res) => {
  let Data6 = MasterLookup.find(c=> c.id ===parseInt(req.params.id));
  if (!Data6) res.status(404).send('object with given id not found' );
   
  MasterLookup=MasterLookup.filter(o=>o.id !==Data6.id)
  fs.writeFile("./MasterLookup.json", stringify(MasterLookup), err => {
      // Checking for errors
  if (err) throw err;
  else
   console.log("Done writing"); // Success
  res.send(Data6)
  });
 })



 module.exports = router;