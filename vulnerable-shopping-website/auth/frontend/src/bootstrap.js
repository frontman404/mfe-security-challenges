import React from "react";
import ReactDOM from "react-dom";
import AuthAppWrapper from "./AuthApp";

const mount = (el) => {
  ReactDOM.render(<AuthAppWrapper />, el);
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
