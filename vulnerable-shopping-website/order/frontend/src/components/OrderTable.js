import React from "react";
import "./OrderTable.scss";

const OrderTable = ({ orders }) => (
  <div className="order-table-wrapper">
    <table className="order-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Town</th>
          <th>Email</th>
          <th>Items</th>
          <th>Total Amount</th>
          <th>Order Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.name}</td>
            <td>{order.address}</td>
            <td>{order.town}</td>
            <td>{order.email}</td>
            <td>{order.items}</td>
            <td>${order.totalAmount.toFixed(2)}</td>
            <td>{new Date(order.orderDate).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderTable;
