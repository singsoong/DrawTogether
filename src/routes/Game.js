import { useEffect, useState } from "react";
import Director from "../components/Director";
import Artist from "../components/Artist";
import { socket } from "../etc/Socket";
import effectSound from "./BgmEffect";
import BGM from './Audio/bgm2.mp3'
import { useLocation } from 'react-router-dom';
import {soundStop,getsounds}from './BgmEffect';

const Game = (props) => {
  const [director, setDirector] = useState(false);

  const SettingDirector = (data) => {
    console.log(data,);
    if (data == null) {
      return;
    }

    if (data.p1.nickname != "") {
      if (data.p1.nickname == props.nickname) {
        setDirector(true);
      }
    }
    if (data.p2.nickname != "") {
      if (data.p2.nickname == props.nickname) {
        setDirector(false);
      }
    }
    if (data.p3.nickname != "") {
      if (data.p3.nickname == props.nickname) {
        setDirector(false);
      }
    }
    if (data.p4.nickname != "") {
      if (data.p4.nickname == props.nickname) {
        setDirector(false);
      }
    }
    if (data.p5.nickname != "") {
      if (data.p5.nickname == props.nickname) {
        setDirector(false);
      }
    }
  };

  useEffect(() => {
    console.log(socket);

    socket.emit("gameStart", [props.code, props.nickname]);

    socket.on("gameStart", function (data) {
      SettingDirector(data);
    });

    socket.on("Umessage", function (data) {
      console.log("Umessage : " + data);

      const UserChatList = document.getElementById("UserChatList");
      const elemet = document.createElement("div");
      elemet.innerText = data;
      UserChatList.appendChild(elemet);
      UserChatList.scrollTop = UserChatList.scrollHeight;
    });
  }, []);
  const [vol, setVol] = useState(getsounds());
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+vol);
  effectSound(2,vol);//bgm 재생
  return (
    <>
      {director ? (
        <Director
          nickname={props.nickname}
          code={props.code}
          director={director}
        ></Director>
      ) : (
        <Artist
          nickname={props.nickname}
          code={props.code}
          director={director}
        ></Artist>
      )}
    </>
  );
};

export default Game;
