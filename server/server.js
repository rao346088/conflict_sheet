const express = require('express');
const router=express.Router()   
const bodyParser = require('body-parser');
var  cors = require('cors')
const config = require('config')


const PORT = 5000;
const api = require('./routes/api')
const MasterLookup = require('./routes/MLK')
const login = require('./routes/login')
const register = require('./routes/register')
const Objects = require('./routes/Objects')
const Endv = require('./routes/Endv')
const package = require('./routes/package')

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use('/api', api)
app.use('/MasterLookup', MasterLookup)
app.use('/login', login)
app.use('/register', register)
app.use('/Objects', Objects)
app.use('/Endv', Endv)
app.use('/package', package)

app.get('/', function(req, res) {
	res.send('Hello from server')
})

if (!config.get('secretkey')){
  console.error('fatal error: secret key not defined')
  process.exit(1)
}
else
{    console.log(`Env key :${config.get('secretkey')}`)}


app.listen(PORT, function(){
  console.log("Server running on localhost:" + PORT);
});