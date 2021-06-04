let package = require('../package1.json')
const express = require('express');
const router=express.Router()   

/*---------------------------PACKAGE METHODS--------------------------*/      

router.get('/', (req, res)=>{
    res.json(package)
  })
  
  router.post('/',(req,res)=>{
    let Userpackage1= req.body
    package.push(Userpackage1)
    fs.writeFile("./1.json", stringify(package), err=>{
      if(err) throw err;
      else
      res.send(Userpackage1)
    });
  });
  
  router.put('/:id', (req,res) => {
    let MLData1 = package1.find(c=> c.id ===parseInt(req.params.id));
    if (!MLData1) {res.status(404).send('object with given id not found' );}
     
    package1=package1.filter(o=>o.id !==MLData1.id)
    MLData1=req.body
    package1.push(MLData1)
    fs.writeFile("./1.json", stringify(package1), err => {
        // Checking for errors
    if (err) throw err;
    else
     console.log("Done writing"); // Success
    res.send(MLData1)
    });
    
    })

    module.exports = router;