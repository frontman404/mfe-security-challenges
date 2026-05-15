import React from "react";
import { useProducts } from "../ProductsProvider";
import styles from "./ProductFilter.module.scss";

const ProductFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div className={styles.productFilter}>
      <label htmlFor="category">Filter by Category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
