import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/products");
      setProducts(response.data);
      const uniqueCategories = [
        ...new Set(response.data.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    }
  };

  const fetchReviews = async (productId) => {
    setReviewsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5002/api/products/${productId}/reviews`
      );
      setReviews(res.data);
    } catch (err) {
      setError("Failed to fetch reviews");
    }
    setReviewsLoading(false);
  };

  const createReview = async (productId, review) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5002/api/products/${productId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchReviews(productId);
    } catch (err) {
      setError("Failed to create review");
    }
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5003/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cartItems = response.data;
        const existingItem = cartItems.find(
          (item) => item.productId === product.id
        );
        if (existingItem) {
          await axios.put(
            `http://localhost:5003/api/cart/${product.id}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } else {
          await axios.post(
            `http://localhost:5003/api/cart/${product.id}`,
            {
              name: product.name,
              price: product.price,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
        window.postMessage({ type: "CART_UPDATED" }, "*");
      } catch (err) {
        setError("Failed to add product to cart");
        console.error(err);
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      window.postMessage({ type: "CART_UPDATED" }, "*");
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        error,
        selectedCategory,
        categories,
        selectedProduct,
        searchTerm,
        addToCart,
        handleProductClick,
        handleBack,
        handleSearch,
        setSelectedCategory,
        filteredProducts,
        reviews,
        reviewsLoading,
        fetchReviews,
        createReview,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
