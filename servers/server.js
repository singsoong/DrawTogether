const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;

var createRoom = require('./router/createRoom');

app.use(cors());

app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'jouno7201'}));

app.use('/createRoom',createRoom);
/*app.get('/createRoom',(req, res)=>{
    console.log("test1234")
});*/

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})