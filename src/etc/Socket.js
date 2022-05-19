import socketio from "socket.io-client";

//export const socket = socketio("http://localhost:3002");

export const socket = socketio(window.location.protocol+"//"+window.location.hostname+":"+"3002");
