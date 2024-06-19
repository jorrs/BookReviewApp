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
    const newBookId = state.books.length + 1; // Adjusted for improving the id generation logic.
    const newBook: Book = {
      id: newBookId,
      title,
      author,
    };
    setState(prevState => ({
      ...prevState,
      books: [...prevState.books, newBook]
    }));
  };

  const addReview = (bookId: number, reviewText: string) => {
    const newReview: Review = {
      bookId,
      reviewText,
    };
    setState(prevState => ({
      ...prevState,
      reviews: [...prevState.reviews, newReview]
    }));
  };

  const getReviewsByBookId = (bookId: number) => {
    return state.reviews.filter(review => review.bookId === bookId);
  };

  return (
    <div>
      <div>
        {state.books.map(book => (
          <div key={book.id}>
            <div>{book.title} by {book.author}</div>
            <button onClick={() => addReview(book.id, `Review for ${book.title}`)}>
              Add Review for {book.title}
            </button>
            <div>
              <strong>Reviews:</strong>
              {getReviewsByBookId(book.id).map((review, index) => (
                <div key={index}>{review.reviewText}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => addBook('New Book', 'Author')}>Add Book</button>
      </div>
    </div>
  );
}

export default App;