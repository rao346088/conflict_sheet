let Objects = require('../Objects.json')
const verifyToken = require('../middleware/verifyToken')
const express = require('express');
const router=express.Router()   

/*--------------OBJECT-LIST GET,POST,PUT-----------------------*/
 console.log("objects get")
  router.get('/', (req, res)=>{
      
    res.json(Objects)
  })
  
  router.post('/',verifyToken,(req,res)=>{
     let UserObjects= req.body
     Objects.push(UserObjects)
     fs.writeFile("./Objects.json", stringify(Objects), err=>{
      if(err) throw err;
      else
      res.send(UserObjects)
    });
  });
  
  router.put('/:id',verifyToken, (req,res) => {
    let Object = Objects.find(c=> c.id === parseInt(req.params.id));
    if (!Object) {
      res.status(404).send('object with given id not found' );
    }
    Objects=Objects.filter(o=>o.id !==Object.id)
    Object=req.body
    Objects.push(Object)
    fs.writeFile("./Objects.json", stringify(Objects), err => {
       if (err) throw err;
    else
      console.log("Done writing"); // Success
  
    res.send(Object)
    });
    })
  

    module.exports = router;
   
  