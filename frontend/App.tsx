import React, { useState, useCallback } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface Review {
  bookId: number;
  content: string;
}

interface AppState {
  bookList: Book[];
  bookReviews: Record<number, Review[]>; // Changed to use a Record for more efficient access
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({ bookList: [], bookReviews: {} });

  // Utilize useRef to incrementally track the next bookId, this avoids duplication and potential issues with deleting books.
  const nextBookId = React.useRef(1);

  const addNewBook = useCallback((title: string, author: string) => {
    const newBook: Book = {
      id: nextBookId.current++,
      title,
      author,
    };

    setAppState((previousState) => ({
      ...previousState,
      bookList: [...previousState.bookList, newBook],
    }));
  }, []);

  const addNewReview = useCallback((bookId: number, content: string) => {
    const newReview: Review = {
      bookId,
      content,
    };
    setAppState((previousState) => ({
      ...previousState,
      bookReviews: {
        ...previousState.bookReviews,
        [bookId]: [...(previousState.bookReviews[bookId] || []), newReview], // This ensures existing reviews are kept and new review is added.
      },
    }));
  }, []);

  const listReviewsByBookId = useCallback((bookId: number): Review[] => {
    return appState.bookReviews[bookId] || [];
  }, [appState.bookReviews]);

  return (
    <div>
      {appState.bookList.map((book) => (
        <div key={book.id}>
          <div>
            {book.title} by {book.author}
          </div>
          <button onClick={() => addNewReview(book.id, `Review for ${book.title}`)}>
            Add Review for {book.title}
          </button>
          <div>
            <strong>Reviews:</strong>
            {listReviewsByBookId(book.id).map((review, index) => (
              <div key={index}>{review.content}</div> // Consider using a more unique key if reviews have unique identifiers
            ))}
          </div>
        </div>
      ))}

      <button onClick={() => addNewBook('New Title', 'New Author')}>Add Book</button>
    </div>
  );
};

export default App;