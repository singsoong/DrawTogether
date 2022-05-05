var express = require('express');
var app = express();
var router = express.Router();

var option = require('../option');
//var bodyParser_node = require('body-parser');
//var session = require('express-session');

//var connection = require('../database.js');


// login
router.get('/',function(req,res){
    
    const roomNumber = Math.floor(Math.random() * 900000) + 100000;
    option.roomNumber[option.roomCount] = roomNumber;

    option.createRoom(roomNumber);

    console.log(option);

    res.json({
        entercode : roomNumber,
        state : "ok"
    });
});

module.exports = router;