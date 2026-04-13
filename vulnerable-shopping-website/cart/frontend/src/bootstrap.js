import React from "react";
import ReactDOM from "react-dom";
import CartAppWrapper from "./CartApp";

const mount = (el) => {
  ReactDOM.render(<CartAppWrapper />, el);
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_cart-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
