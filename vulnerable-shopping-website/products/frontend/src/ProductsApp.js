import React from "react";
import ProductsProvider, { useProducts } from "./ProductsProvider";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import ProductSearch from "./components/ProductSearch";
import Product from "./components/Product";
import ReviewList from "./components/ReviewList";
import CreateReview from "./components/CreateReview";
import "./ProductsApp.scss";

const ProductsApp = () => {
  const {
    selectedProduct,
    handleBack,
    addToCart,
    handleSearch,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    error,
    handleProductClick,
    reviews,
    reviewsLoading,
    fetchReviews,
    createReview,
  } = useProducts();

  return (
    <div className="products-app-container">
      {selectedProduct ? (
        <div>
          <Product product={selectedProduct} />
          <ReviewList productId={selectedProduct.id} />
          <CreateReview productId={selectedProduct.id} />
        </div>
      ) : (
        <>
          <h2>Products</h2>
          <ProductSearch />
          <ProductFilter />
          <ProductList />
        </>
      )}
    </div>
  );
};

const ProductsAppWrapper = () => (
  <ProductsProvider>
    <ProductsApp />
  </ProductsProvider>
);

export default ProductsAppWrapper;
