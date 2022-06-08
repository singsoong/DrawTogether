const { NULL } = require("mysql/lib/protocol/constants/types");
const { findRenderedComponentWithType } = require("react-dom/test-utils");

var roomCount = 0;
exports.roomNumber = new Array();
var rooms= new Array();
const voteCheck = [false,false,false,false,false];

exports.createRoom = function(roomNumber){
    room = {
        RoomNumber : roomNumber,
        p1:{
            nickname :"",
            state : "wait",
            id : "",
            director : true,
            image : null,
            score : 0,
            vote : false
        }, 
        p2:{
            nickname :"",
            state : "wait",
            id : "",
            director : false,
            image : null,
            score : 0,
            vote : false
        }, 
        p3:{
            nickname :"",
            state : "wait",
            id : "",
            director : false,
            image : null,
            score : 0,
            vote : false
        },
        p4:{
            nickname :"",
            state : "wait",
            id : "",
            director : false,
            image : null,
            score : 0,
            vote : false
        },
        p5:{
            nickname :"",
            state : "wait",
            id : "",
            director : false,
            image : null,
            score : 0,
            vote : false
        }
    };
    
    rooms[roomCount++] = room;
};

const nicknameCheck = function(nickname_p,roomNumber){
    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){
            if(rooms[i].p1.nickname == nickname_p){
                return false;
            }else if(rooms[i].p2.nickname == nickname_p){
                return false;
            }else if(rooms[i].p3.nickname == nickname_p){
                return false;
            }else if(rooms[i].p4.nickname == nickname_p){
                return false;
            }else if(rooms[i].p5.nickname == nickname_p){
                return false;
            }

            break;
        }
    }

    return true;
}

exports.AddUser = function(nickname_p,roomNumber,id){
    if(nicknameCheck(nickname_p,roomNumber) == false){
        return;
    }

    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){
            if(rooms[i].p1.nickname == ""){
                rooms[i].p1.nickname = nickname_p;
                rooms[i].p1.id = id;
            }else if(rooms[i].p2.nickname == ""){
                rooms[i].p2.nickname = nickname_p;
                rooms[i].p2.id = id;
            }else if(rooms[i].p3.nickname == ""){
                rooms[i].p3.nickname = nickname_p;
                rooms[i].p3.id = id;
            }else if(rooms[i].p4.nickname == ""){
                rooms[i].p4.nickname = nickname_p;
                rooms[i].p4.id = id;
            }else if(rooms[i].p5.nickname == ""){
                rooms[i].p5.nickname = nickname_p;
                rooms[i].p5.id = id;
            }   
            
            //rooms[i].playerCount++;
            break;
        }
    }

    
}

exports.searchRoom = function(roomNumber){
    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){
            return rooms[i];
        }
    }

    console.log("room is null   roomnumber : "+roomNumber);
    return null;
}

exports.StateChange = function(flag,roomNumber,nickname_p){
    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){
            if(rooms[i].p1.nickname == nickname_p){
                rooms[i].p1.state = flag;
            }else if(rooms[i].p2.nickname == nickname_p){
                rooms[i].p2.state = flag;
            }else if(rooms[i].p3.nickname == nickname_p){
                rooms[i].p3.state = flag;
            }else if(rooms[i].p4.nickname == nickname_p){
                rooms[i].p4.state = flag;
            }else if(rooms[i].p5.nickname == nickname_p){
                rooms[i].p5.state = flag;
            }
        }
    }
}


exports.UpdateImg = function(img,roomNumber,nickname_p){
    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){
            if(rooms[i].p1.nickname == nickname_p){
                rooms[i].p1.image = img;
            }else if(rooms[i].p2.nickname == nickname_p){
                rooms[i].p2.image = img;
            }else if(rooms[i].p3.nickname == nickname_p){
                rooms[i].p3.image = img;
            }else if(rooms[i].p4.nickname == nickname_p){
                rooms[i].p4.image = img;
            }else if(rooms[i].p5.nickname == nickname_p){
                rooms[i].p5.image = img;
            }
        }
    }
}

exports.AddScore = function(score,roomNumber) {    
    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){
            rooms[i].p1.score += (score[0] * 1);  
            rooms[i].p2.score += (score[1] * 1);
            rooms[i].p3.score += (score[2] * 1);
            rooms[i].p4.score += (score[3] * 1);
            rooms[i].p5.score += (score[4] * 1);
            console.log(
                rooms[i].p1.score,
                rooms[i].p2.score,
                rooms[i].p3.score,
                rooms[i].p4.score,
                rooms[i].p5.score,
                "option check log"
                );
        }
    }
}

exports.outputScore = function(roomNumber) {
    const arr = [0, 0, 0, 0, 0];
    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){
            arr[0] = rooms[i].p1.score;
            arr[1] = rooms[i].p2.score;
            arr[2] = rooms[i].p3.score;
            arr[3] = rooms[i].p4.score;
            arr[4] = rooms[i].p5.score;
        }
    }
    return arr;
}

exports.addVote = function (data, roomNumber, nickname_p) {
    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){
            if(rooms[i].p1.nickname == nickname_p){
                rooms[i].p1.vote = data;
            }else if(rooms[i].p2.nickname == nickname_p){
                rooms[i].p2.vote = data;
            }else if(rooms[i].p3.nickname == nickname_p){
                rooms[i].p3.vote = data;
            }else if(rooms[i].p4.nickname == nickname_p){
                rooms[i].p4.vote = data;
            }else if(rooms[i].p5.nickname == nickname_p){
                rooms[i].p5.vote = data;
            }
            console.log("투표데이터",rooms[i].p1.vote, rooms[i].p2.vote, rooms[i].p3.vote, rooms[i].p4.vote, rooms[i].p5.vote);
        }
    }
}

exports.searchVote = function (roomNumber) {
    console.log("call searchVote");
    let arr = [false, false, false, false, false, 0];
    let countLength = 0;
    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){     
            arr[0] = rooms[i].p1.vote;
            arr[1] = rooms[i].p2.vote;
            arr[2] = rooms[i].p3.vote;
            arr[3] = rooms[i].p4.vote;
            arr[4] = rooms[i].p5.vote;
            if(rooms[i].p1.image != NULL) {
                countLength++;
            }
            if(rooms[i].p2.image != NULL) {
                countLength++;
            }
            if(rooms[i].p3.image != NULL) {
                countLength++;
            }
            if(rooms[i].p4.image != NULL) {
                countLength++;
            }
            if(rooms[i].p5.image != NULL) {
                countLength++;
            }

            arr[5] = countLength - 1;
        }
    }
    return arr;
}

exports.roomCount = roomCount;
exports.rooms = rooms;