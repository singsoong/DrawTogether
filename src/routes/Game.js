import { useState } from "react";
import Artist from "../components/Artist";
import Director from "../components/Director";

function Game() {
  const [director, setDirector] = useState(true);
  return <>{director ? <Director></Director> : <Artist></Artist>}</>;
}

export default Game;
