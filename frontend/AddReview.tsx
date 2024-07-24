import React, { useState, FormEvent } from 'react';

interface AddReviewProps {
  addReview: (name: string, rating: number, comment: string) => void;
}

interface ReviewState {
  name: string;
  rating: string;
  comment: string;
}

const AddReview: React.FC<AddReviewProps> = ({ addReview }) => {
  const [review, setReview] = useState<ReviewState>({ name: '', rating: '', comment: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEmilyEvent) => {
    e.preventDefault();
    addReview(review.name, parseFloat(review.rating), review.comment);
    setReview({ name: '', rating: '', comment: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={review.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={review.rating}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={review.comment}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReview;