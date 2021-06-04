const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function (req, res, next) {
    console.log("before dedecrypt",res.body,req.route.path)
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
     let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    
    this.Dcpayload = payload.subject
    res.body = payload.subject
    console.log("after descrypt",res.body)
    if(req.route.path ==='/MasterLookup' && req.route.path ==='/Endv' && 
    req.route.methods.post === true  && req.route.methods.post !== 'undefined' ){
    
            if(this.Dcpayload.Role==='ITIBSE')
            {
              console.log("payload-verify token",this.Dcpayload)
  
            }else
            {
              console.log("'Given id is not authorised'",this.Dcpayload)
              return res.status(401).send('Given id is not authorised') 
  
            } 
            req.userId = payload.subject
           
    }
    next()
  }
