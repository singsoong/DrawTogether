import { useEffect, useState } from "react";
import Artist from "../components/Artist";
import Director from "../components/Director";
import { socket } from "../etc/Socket";

const Game = (props) => {
  const [director, setDirector] = useState(false);
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    setNickname(props.nickname);
    setCode(props.code);

    socket.emit("test", "test1234");
  }, [code, nickname]);

  return <>{director ? <Director></Director> : <Artist></Artist>}</>;
};

export default Game;
