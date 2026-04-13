import React from "react";
import { useProducts } from "../ProductsProvider";
import "./Product.scss";

const Product = ({ product }) => {
  const { addToCart, handleBack } = useProducts();
  return (
    <div className="product-detail">
      <button className="back-button" onClick={handleBack}>
        Back to Products
      </button>
      <h2 className="product-title">{product.name}</h2>
      <img
        className="product-image"
        src={`/images/${product.image}`}
        alt={product.name}
      />
      <p
        className="product-description"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
      <div className="product-price-add-to-cart">
        <span className="product-price">${product.price}</span>
        <button
          className="add-to-cart-button"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
