import React, { useState } from "react";
import { useProducts } from "../ProductsProvider";
import styles from "./ProductSearch.module.scss";

const ProductSearch = () => {
  const { handleSearch } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className={styles.productSearchContainer}>
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
