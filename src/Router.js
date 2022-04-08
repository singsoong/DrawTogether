import React from 'react';
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Main from "./routes/Main";
import Waiting from "./routes/Waiting";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/waiting">
          <Waiting />
        </Route>
        <Route path="/">
        <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
