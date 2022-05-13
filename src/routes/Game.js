import { useEffect, useState } from "react";
import Artist from "../components/Artist";
import Director from "../components/Director";
import { socket } from "../etc/Socket";

const Game = (props) => {
  const [director, setDirector] = useState(false);
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState("");

  const SettingDirector = (data) => {
    if (data.p1.nickname != "") {
      if (data.p1.nickname == nickname) {
        setDirector(true);
      }
    }
    if (data.p2.nickname != "") {
      if (data.p2.nickname == nickname) {
        setDirector(false);
      }
    }
    if (data.p3.nickname != "") {
      if (data.p3.nickname == nickname) {
        setDirector(false);
      }
    }
    if (data.p4.nickname != "") {
      if (data.p4.nickname == nickname) {
        setDirector(false);
      }
    }
    if (data.p5.nickname != "") {
      if (data.p5.nickname == nickname) {
        setDirector(false);
      }
    }
  }


  useEffect(() => {
    setNickname(props.nickname);
    setCode(props.code);

    console.log(socket);

    socket.emit("gameStart",[code, nickname]);

    socket.on("gameStart",function (data) {
      SettingDirector(data);
    });

  }, [code, nickname]);

  return <>{director ? <Director nickname={props.nickname} code={props.code}></Director> : <Artist nickname={props.nickname} code={props.code}></Artist>}</>;
};

export default Game;
