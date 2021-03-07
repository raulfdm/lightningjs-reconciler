import React from "react";
// import ReactDOM from 'react-dom';
import { MyCustomRenderer } from "./myCustomRenderer";
// import App from "./App";

import lng from "@lightningjs/core";

// console.log(app.stage.getCanvas());

function Logo() {
  return <element x={960} y={540} mount={0.5} text={{ text: "Loading..." }} />;
}

function Header() {
  return (
    <element>
      <Logo />
    </element>
  );
}
function App() {
  return (
    <app rect color={0xff000000} w={1920} h={1080}>
      <Header />
    </app>
  );
}

App.prototype = Object.create(lng.Application);

// const app = new App();

MyCustomRenderer.render(
  new App(),

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,

  document.body
);
