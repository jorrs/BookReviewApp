import React, { useState } from 'react';

interface AddReviewProps {
  onReviewSubmit: (name: string, rating: number, comment: string) => void;
}

interface ReviewFormState {
  reviewerName: string;
  reviewRating: number; // Changed from string to number for direct use
  reviewComment: string;
}

const AddReview: React.FC<AddReviewProps> = ({ onReviewSubmit }) => {
  // Initialized reviewRating as a number directly
  const [formState, setFormState] = useState<ReviewFormState>({ reviewerName: '', reviewRating: 0, reviewComment: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'reviewRating' ? Number(value) : value, // Direct conversion to number for reviewRating
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { reviewerName, reviewRating, reviewComment } = formState;
    onReviewSubmit(reviewerName, reviewRating, reviewComment);
    setFormState({ reviewerName: '', reviewRating: 0, reviewComment: '' }); // Reset with initial value for reviewRating as number
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="reviewerName">Name</label>
        <input
          type="text"
          id="reviewerName"
          name="reviewerName"
          value={formState.reviewerName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="reviewRating">Rating</label>
        <input
          type="number"
          id="reviewRating"
          name="reviewRating"
          min="1"
          max="5"
          value={formState.reviewRating.toString()} // Ensure the number is converted to a string for input value
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="reviewComment">Comment</label>
        <textarea
          id="reviewComment"
          name="reviewComment"
          value={formState.reviewComment}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReview;