let Endv = require('../Endv.json')
const express = require('express');
const router=express.Router()   
const verifyToken = require('../middleware/verifyToken')

/*----------------------ENDVOR-LIST----------------------------------*/
   console.log("Endv get")

    router.get('/',  (req, res)=>{
        res.json(Endv)
    })
      
    router.post('/', verifyToken,  (req, res)=>{
       let UserEndv = req.body
       Endv.push(UserEndv)
       fs.writeFile("./Endv.json", stringify(Endv), err => {
         if(err) throw err;
         else
         res.send(UserEndv)
        });
    });
     
    router.put('/:id',  verifyToken,(req,res) => {
        let MLData2 = Endv.find(c=> c.id ===parseInt(req.params.id));
        if (!MLData2) {res.status(404).send('object with given id not found' );}
          
        Endv=Endv.filter(o=>o.id !==MLData2.id)
        MLData2=req.body
        Endv.push(MLData2)
        fs.writeFile("./Endv.json", stringify(Endv), err => {
             // Checking for errors
        if (err) throw err;
        else
        console.log("Done writing"); // Success
        res.send(MLData2)
     });
         
    })
     
         router.delete('/:id', verifyToken,(req,res) => {
           let Data7 = Endv.find(c=> c.id ===parseInt(req.params.id));
           if (!Data7) res.status(404).send('object with given id not found' );
            
           Endv=Endv.filter(o=>o.id !==Data7.id)
           fs.writeFile("./Endv.json", stringify(Endv), err => {
               // Checking for errors
           if (err) throw err;
           else
            console.log("Done writing"); // Success
            res.send(Data7)
           });
           })
           

module.exports = router;