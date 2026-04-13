import React from "react";
import { useProducts } from "../ProductsProvider";
import styles from "./ProductList.module.scss";

const ProductList = () => {
  const { addToCart, filteredProducts, handleProductClick, error } =
    useProducts();

  return (
    <div className={styles.productListContainer}>
      <div className={styles.productList}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => handleProductClick(product)}
            >
              <img src={`/images/${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
