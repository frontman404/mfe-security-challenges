import React, { useEffect } from "react";
import { useProducts } from "../ProductsProvider";
import "./ReviewList.scss";

const ReviewList = ({ productId }) => {
  const { reviews, fetchReviews, reviewsLoading } = useProducts();

  useEffect(() => {
    fetchReviews(productId);
  }, [productId]);

  if (reviewsLoading) return <div>Loading reviews...</div>;
  if (!reviews.length)
    return <div className="review-list">No reviews yet.</div>;

  return (
    <div className="review-list">
      <h3>Reviews</h3>
      {reviews.map((r) => (
        <div className="review-item" key={r.id}>
          <div className="review-title">
            {r.title} <span className="review-grade">({r.grade}/5)</span>
          </div>
          <div
            className="review-body"
            dangerouslySetInnerHTML={{ __html: r.body }}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
