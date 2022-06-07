import React, { useState } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Game from "./routes/Game";
import Main from "./routes/Main";
import Waiting from "./routes/Waiting";
import End from "./routes/End";

function Router() {
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState(0);
  const [musicVol, setMusicVol]= useState(0);

  return (
    <BrowserRouter>
      <Route exact path="/">
        <Main setNickname={setNickname} setCode={setCode} setMusicVol={setMusicVol} />
      </Route>
      <Route exact path="/waiting">
        <Waiting nickname={nickname} code={code} setMusicVol={setMusicVol}/>
      </Route>
      <Route path="/waiting/:code">
        <Waiting nickname={nickname} code={code} setMusicVol={setMusicVol}/>
      </Route>
      <Route path="/game">
        <Game nickname={nickname} code={code} musicVol={musicVol}/>
      </Route>
      <Route path="/end">
        <End nickname={nickname} code={code} musicVol={musicVol}/>
      </Route>
    </BrowserRouter>
  );
}

export default Router;
