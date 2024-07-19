// APIService.ts
import axios from 'axios';

const fetchReviews = async (): Promise<Review[]> => {
  const response = await axios.get('/api/reviews');
  return response.data;
};

export { fetchReviews };
```
```bash
npm install react-query
# or
yarn add react-query
```
```typescript
// In your component or custom hook
import { useQuery } from 'react-query';
import { fetchReviews } from './APIService';

const useReviews = () => {
  return use.region('reviews', fetchReviews);
};

const ReviewsListContainer = () => {
  const { data: reviews, isLoading, error } = useReviews();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return <ReviewsList reviews={reviews || []} />;
};