const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;

const http = require("http");
const server = http.Server(app);
const io = require('socket.io')(server , {cors:{origin : "*"}});

var createRoom = require('./router/createRoom');
var enter = require('./router/enter');
var option = require('./option');

app.use(cors());

app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'jouno7201'}));

app.use('/createRoom',createRoom);
app.use('/enter',enter);

io.on('connect',function(socket){
    
    socket.emit('msg', `${socket.id} 연결 되었습니다.`);
  
    socket.on('add', function (data) {
        option.AddUser(data[1],data[0],socket.id);

        const roomdata = option.searchRoom(data[0]);

        socket.join(data[0]);
        io.to(data[0]).emit('add', roomdata);
        socket.emit('add', roomdata);
    });

    socket.on('state', function (data) {
        const roomdata = option.searchRoom(data[0]);

        console.log(socket.id+"가 " +data+"상태 입니다.");
        
        option.StateChange(data[2],data[0],data[1]);
        
        io.to(data[0]).emit('state', roomdata);
        socket.emit('state', roomdata);
    });

    socket.on('gameStart',function(data){
        console.log(data);
        const roomdata = option.searchRoom(data[0]);
        console.log(roomdata);
        io.to(data[0]).emit('state', roomdata);
        socket.emit('gameStart', roomdata);
    });

    socket.on('Dmessage',function(data){
        console.log(data);

        io.to(data[0]).emit('Dmessage', [data[1],data[2]]);
    });

    socket.on('Umessage',function(data){
        console.log(data);

        io.to(data[0]).emit('Umessage', data[1]);
        //socket.emit('Umessage', data[1]);
    });

    socket.on('image',function(data){
        console.log(data);
        
        option.UpdateImg(data[2],data[0],data[1]);

        const roomdata = option.searchRoom(data[0]);
        
        io.to(data[0]).emit('image', roomdata);
        //socket.emit('image', data);
    });

    socket.on('gametime',function(data){
        console.log(data);

        io.to(data[0]).emit('gametime', data[1]);
    });

    socket.on('gameScore',function(data){
        console.log(data);

        io.to(data[0]).emit('gameScore', data[1]);
    });
});

io.listen(3002);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
});



