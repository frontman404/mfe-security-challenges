import React, { useEffect } from "react";
import { useProducts } from "../ProductsProvider";
import DOMPurify from "dompurify";
import styles from "./ReviewList.module.scss";

const ReviewList = ({ productId }) => {
  const { reviews, fetchReviews, reviewsLoading } = useProducts();

  useEffect(() => {
    fetchReviews(productId);
  }, [productId]);

  if (reviewsLoading) return <div>Loading reviews...</div>;
  if (!reviews.length)
    return <div className={styles.reviewList}>No reviews yet.</div>;

  return (
    <div className={styles.reviewList}>
      <h3>Reviews</h3>
      {reviews.map((r) => (
        <div className={styles.reviewItem} key={r.id}>
          <div className={styles.reviewTitle}>
            {r.title} <span className={styles.reviewGrade}>({r.grade}/5)</span>
          </div>
          <div
            className={styles.reviewBody}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(r.body) }}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
