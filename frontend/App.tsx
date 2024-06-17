import React, { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface Review {
  bookId: number;
  reviewText: string;
}

interface AppState {
  books: Book[];
  reviews: Review[];
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({ books: [], reviews: [] });

  const addBook = (title: string, author: string) => {
    const newBook: Book = {
      id: state.books.length + 1,
      title,
      author,
    };
    setState({ ...state, books: [...state.books, newBook] });
  };

  const addReview = (bookId: number, reviewText: string) => {
    const newReview: Review = {
      bookId,
      reviewText,
    };
    setState({ ...state, reviews: [...state.reviews, newReview] });
  };

  return (
    <div>
      <div>
        {state.books.map(book => (
          <div key={book.id}>
            {book.title} by {book.author}
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => addBook('New Book', 'Author')}>Add Book</button>
      </div>

      <div>
        {state.reviews.map((review, index) => (
          <div key={index}>
            Review for Book ID {review.bookId}: {review.reviewText}
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => addReview(1, 'This is an amazing book!')}>
          Add Review for Book 1
        </button>
      </div>
    </div>
  );
}

export default App;