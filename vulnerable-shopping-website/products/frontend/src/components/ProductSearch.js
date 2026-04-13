import React, { useState } from "react";
import { useProducts } from "../ProductsProvider";
import "./ProductSearch.scss";

const ProductSearch = () => {
  const { handleSearch } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="product-search-container">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default ProductSearch;
