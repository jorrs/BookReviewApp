import React, { useState } from 'react';

interface AddReviewProps {
  onReviewSubmit: (name: string, rating: number, comment: string) => void;
}

interface ReviewFormState {
  reviewerName: string;
  reviewRating: string;
  reviewComment: string;
}

const AddReview: React.FC<AddViewProps> = ({ onReviewSubmit }) => {
  const [formState, setFormState] = useState<ReviewFormState>({ reviewerName: '', reviewRating: '', reviewComment: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onReviewSubmit(formState.reviewerName, parseFloat(formState.reviewRating), formState.reviewComment);
    // Reset form state after submitting
    setFormState({ reviewerName: '', reviewRating: '', reviewComment: '' });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="reviewerName">Name:</label>
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
        <label htmlFor="reviewRating">Rating:</label>
        <input
          type="number"
          id="reviewRating"
          name="reviewRating"
          min="1"
          max="5"
          value={formState.reviewRating}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="reviewComment">Comment:</label>
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