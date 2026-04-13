import React, { useRef, useEffect } from "react";
import { mount } from "products/ProductsApp";

const ProductsApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default ProductsApp;
