import React from 'react';
interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
}
interface ReviewsListProps {
  reviews: Review[];
}
const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <ul>
      {reviews.map((review, index) => (
        <li key={index}>
          <h4>{review.reviewerName}</h4>
          <p>Rating: {review.rating}/5</p>
          <p>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
};
export default ReviewsList;