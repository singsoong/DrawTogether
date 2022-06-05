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
            score : ""
        }, 
        p2:{
            nickname :"",
            state : "wait",
            id : "",
            director : false,
            image : null,
            score : ""
        }, 
        p3:{
            nickname :"",
            state : "wait",
            id : "",
            director : false,
            image : null,
            score : ""
        },
        p4:{
            nickname :"",
            state : "wait",
            id : "",
            director : false,
            image : null,
            score : ""
        },
        p5:{
            nickname :"",
            state : "wait",
            id : "",
            director : false,
            image : null,
            score : ""
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

exports.AddScore = function(score,roomNumber,nickname_p) {    
    for(var i=0;i<roomCount;i++){
        if(rooms[i].RoomNumber == roomNumber){
            if (rooms[i].p1.nickname == nickname_p) {
                for (let j = 0; j < 5; j++) {
                    if (voteCheck[j]) {
                        console.log("already vote");
                    } else {
                        rooms[i].p1.score += score[0];  
                        rooms[i].p2.score += score[1];
                        rooms[i].p3.score += score[2];
                        rooms[i].p4.score += score[3];
                        rooms[i].p5.score += score[4];
                        voteCheck[j] = true;
                    }                      
                }
                      
            }
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

exports.roomCount = roomCount;
exports.rooms = rooms;