import React from "react";
import ReactDOM from "react-dom";
import ProductsAppWrapper from "./ProductsApp";

const mount = (el) => {
  ReactDOM.render(<ProductsAppWrapper />, el);
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_products-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
