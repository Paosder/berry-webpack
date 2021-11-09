import React from "react";
import ReactDOM from "react-dom";
import { Normalize } from "styled-normalize";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.render(
  <>
    <Normalize />
    <App />
  </>,
  root
);
