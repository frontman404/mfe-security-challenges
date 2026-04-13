import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import styles from "./App.module.scss";

const AuthApp = lazy(() => import("./components/AuthApp"));
const ProductsApp = lazy(() => import("./components/ProductsApp"));
const CartApp = lazy(() => import("./components/CartApp"));
const OrderApp = lazy(() => import("./components/OrderApp"));

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContent}>
        <section className={styles.productsSection}>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductsApp />
          </Suspense>
        </section>
        <section className={styles.authCartSection}>
          <div className={styles.authSection}>
            <Suspense fallback={<div>Loading...</div>}>
              <AuthApp />
            </Suspense>
          </div>
          <div className={styles.cartSection}>
            <Suspense fallback={<div>Loading...</div>}>
              <CartApp />
            </Suspense>
          </div>
          <div className={styles.orderSection}>
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
