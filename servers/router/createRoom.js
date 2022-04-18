var express = require('express');
var app = express();
var router = express.Router();
//var bodyParser_node = require('body-parser');
//var session = require('express-session');

//var connection = require('../database.js');


// login
router.get('/',function(req,res){
    res.json({
        entercode : Math.floor(Math.random() * 900000) + 100000,
        state : "ok"
    });
});

module.exports = router;