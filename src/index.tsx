import React from "react";
import ReactDOM from "react-dom";

import Editor from "@pages/editor";
import { ContextProvider } from "@components/Context";

import "./styles/main.scss";

ReactDOM.render(
  <ContextProvider>
    <Editor />
  </ContextProvider>,
  document.getElementById("app")
);
