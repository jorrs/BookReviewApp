// APIService.ts
import axios from 'axios';

interface Review {
}

const fetchReviews = async (): Promise<Review[]> => {
  const response = await axios.get('/api/reviews');
  return response.data;
};

export { fetchReviews };

// In your component or custom hook
import { useQuery } from 'react-query';
import { fetchReviews } from './APIService';

const useReviews = () => {
  return useQuery('reviews', fetchReviews, {
    staleTime: 5 * 60 * 1000, 
    cacheTime: 15 * 60 * 1000, 
    refetchOnWindowFocus: 'always',
    refetchInterval: 60 * 1000, 
  });
};

const ReviewsListContainer = () => {
  const { data: reviews, isLoading, error } = useReviews();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return <ReviewsList reviews={reviews || []} />;
};

export default ReviewsListContainer;