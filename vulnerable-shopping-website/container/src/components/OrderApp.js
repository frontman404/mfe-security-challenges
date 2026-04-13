import React, { useRef, useEffect } from "react";
import { mount } from "order/OrderApp";

const OrderApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default OrderApp;
