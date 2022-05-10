import React, { useState } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Game from "./routes/Game";
import Main from "./routes/Main";
import Waiting from "./routes/Waiting";

function Router() {
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState("");

  return (
    <BrowserRouter>
      <Route exact path="/">
        <Main setNickname={setNickname} setCode={setCode} />
      </Route>
      <Route exact path="/waiting">
        <Waiting nickname={nickname} code={code}/>
      </Route>
      <Route path="/waiting/:code">
        <Waiting nickname={nickname} code={code}/>
      </Route>
      <Route path="/game">
        <Game nickname={nickname} code={code}/>
      </Route>
    </BrowserRouter>
  );
}

export default Router;
