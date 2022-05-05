var roomCount = 0;
exports.roomNumber = new Array();
var rooms= new Array();

exports.createRoom = function(roomNumber){
    room = {
        RoomNumber : roomNumber,
        p1:{
            nickname :"",
            state : "wait",
            id : ""
        }, 
        p2:{
            nickname :"",
            state : "wait",
            id : ""
        }, 
        p3:{
            nickname :"",
            state : "wait",
            id : ""
        },
        p4:{
            nickname :"",
            state : "wait",
            id : ""
        },
        p5:{
            nickname :"",
            state : "wait",
            id : ""
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

exports.roomCount = roomCount;
exports.rooms = rooms;