import { Howl } from 'howler';
import { NULL } from 'mysql/lib/protocol/constants/types';
import { finalVolume } from "../components/volume";
import BGM1 from './Audio/bgm1.mp3'
import BGM2 from './Audio/bgm2.mp3'
import React from "react";
import ReactDOM from "react-dom";

var sound1 = new Howl({src:['http://localhost:3000/Audio/bgm1.mp3']});
var sound2 = new Howl({src:['http://localhost:3000/Audio/bgm2.mp3']});

var Sounds = 0;
console.log("!!!!!!!!!!!!!!!");
function effectSound(src, volume) {
    const soundInject = (src) => {
        if (src == 1) {
            Sounds = volume;
            console.log("변경"+Sounds);
            sound1.volume(Sounds);
            sound1.play();
        }
        else if (src == 2) {
            Sounds = volume;
            console.log("변경"+Sounds);
            sound2.volume(Sounds);
            sound2.play();
        }
    }
    soundInject(src);
}

export const getsounds= () => {
    return Sounds;
} 
//exports.sound1 = sound1;
//exports.sound2 = sound2;

export const soundStop = () => {sound1.stop(); sound2.stop();}
export default effectSound;