import React from "react";
import ReactDOM from "react-dom";
import OrderAppWrapper from "./OrderApp";

const mount = (el) => {
  ReactDOM.render(<OrderAppWrapper />, el);
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_order-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
