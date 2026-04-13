import React from "react";
import OrderProvider from "./OrderProvider";
import OrderList from "./components/OrderList";

const OrderApp = () => {
  return (
    <div>
      <OrderList />
    </div>
  );
};

const OrderAppWrapper = () => (
  <OrderProvider>
    <OrderApp />
  </OrderProvider>
);

export default OrderAppWrapper;
