var express = require("express");
var app = express();
var router = express.Router();

var option = require('../option');
//var bodyParser_node = require('body-parser');
//var session = require('express-session');

//var connection = require('../database.js');

// login
router.get("/", function (req, res) {
  var temp =0;
  for(var i =0;i<option.roomCount;i++){
    if(req.query.entercode == option.roomNumber[i]){
      temp = i;
    }
  }
  console.log(req.query.nickname + "이 "+req.query.entercode+"번방에 입장 요청합니다.");
  console.log(temp);

  if (temp != -1) {
    res.json({
      state: "ok",
    });
  } else {
    res.json({
      state: "no",
    });
  }
});

module.exports = router;
