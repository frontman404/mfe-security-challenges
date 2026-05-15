import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import "./App.scss";

const AuthApp = lazy(() => import("./components/AuthApp"));
const ProductsApp = lazy(() => import("./components/ProductsApp"));
const CartApp = lazy(() => import("./components/CartApp"));
const OrderApp = lazy(() => import("./components/OrderApp"));

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <section className="products-section">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductsApp />
          </Suspense>
        </section>
        <section className="auth-cart-section">
          <div className="auth-section">
            <Suspense fallback={<div>Loading...</div>}>
              <AuthApp />
            </Suspense>
          </div>
          <div className="cart-section">
            <Suspense fallback={<div>Loading...</div>}>
              <CartApp />
            </Suspense>
          </div>
          <div className="order-section">
            <Suspense fallback={<div>Loading...</div>}>
              <OrderApp />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
