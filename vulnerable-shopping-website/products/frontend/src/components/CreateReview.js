import React, { useState } from "react";
import { useProducts } from "../ProductsProvider";
import "./CreateReview.scss";

const CreateReview = ({ productId }) => {
  const { createReview } = useProducts();
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState(5);
  const [body, setBody] = useState("");

  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="create-review-form not-logged-in">
        <p>You must be logged in to write a review.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return;
    await createReview(productId, {
      title,
      grade,
      body,
    });
    setTitle("");
    setGrade(5);
    setBody("");
  };

  return (
    <form className="create-review-form" onSubmit={handleSubmit}>
      <h3 className="create-review-title">Write a Review</h3>
      <input
        type="text"
        placeholder="Review Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={grade} onChange={(e) => setGrade(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Review Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default CreateReview;
