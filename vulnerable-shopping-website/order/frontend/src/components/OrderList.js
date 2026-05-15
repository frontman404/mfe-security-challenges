import React from "react";
import { useOrder } from "../OrderProvider";
import OrderTable from "./OrderTable";
import "./OrderList.scss";

const OrderList = () => {
  const { orders, error, user, adminMode, toggleAdminMode } = useOrder();

  if (!user) {
    return (
      <div className="order-list-container">
        <div className="order-list">
          <h2>Order List</h2>
          <p>Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <div className="order-list">
        <h2 onClick={toggleAdminMode}>
          Order List {adminMode ? "(Admin Mode)" : ""}
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default OrderList;
