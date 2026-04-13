import React from "react";
import { useProducts } from "../ProductsProvider";
import styles from "./Product.module.scss";

const Product = ({ product }) => {
  const { addToCart, handleBack } = useProducts();
  return (
    <div className={styles.productDetail}>
      <button className={styles.backButton} onClick={handleBack}>
        Back to Products
      </button>
      <h2 className={styles.productTitle}>{product.name}</h2>
      <img
        className={styles.productImage}
        src={`/images/${product.image}`}
        alt={product.name}
      />
      <p className={styles.productDescription}>{product.description}</p>
      <div className={styles.productPriceAddToCart}>
        <span className={styles.productPrice}>${product.price}</span>
        <button
          className={styles.addToCartButton}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
