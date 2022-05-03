const e = require('express');
var express = require('express');
var app = express();
var router = express.Router();

var connection = require('../database.js');

// login
router.get('/',function(req,res){
    // 방장 nickname  확인
    var nickname = req.query.nickname;
    console.log("userNickname : "+nickname);

    // 입장 코드 생성 ( 임의의 숫자 6자리로 생성 )
    var code = Math.floor(Math.random() * 900000) + 100000;
    //var code = 123123;
    console.log("create Room code : "+code);

    // + 코드 생성 후 코드 유무 검색 
    connection.query('select * from roomtable.room where code=?',code, function(err,result) {
        if(result[0] != undefined){
            if(result[0].code == code){ 
                console.log("이미 존재하는 code 입니다. code를 새로 발급합니다.");
                code = Math.floor(Math.random() * 900000) + 100000;
            }else{
                console.log("검색 오류입니디다. DB 검색 code : "+result[0].code +" 발급 코드 : "+code);
            }
        }else{
            console.log("등록 가능한 code 입니다.  발급 코드 :  "+code);
        }   
    })   
    // db room 생성

    // res 전송

    res.json({
        entercode : code,
        state : "ok"
    });
});

module.exports = router;