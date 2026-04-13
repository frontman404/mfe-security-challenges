import React from "react";
import { useProducts } from "../ProductsProvider";
import "./ProductList.scss";

const ProductList = () => {
  const { addToCart, filteredProducts, handleProductClick, error } =
    useProducts();

  return (
    <div className="product-list-container">
      <div className="product-list">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
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
