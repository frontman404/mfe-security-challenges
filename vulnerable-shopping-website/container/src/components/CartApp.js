import React, { useRef, useEffect } from "react";
import { mount } from "cart/CartApp";

const CartApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default CartApp;
