import React from "react";
import Router from "./Router";
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
`;

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router />
    </>
  );
}

export default App;
