import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Game from "./routes/Game";
import Main from "./routes/Main";
import Waiting from "./routes/Waiting";

function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/waiting">
        <Waiting />
      </Route>
      <Route path="/game">
        <Game />
      </Route>
    </BrowserRouter>
  );
}

export default Router;
