const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('From ApI route')
})
  
  module.exports = router;