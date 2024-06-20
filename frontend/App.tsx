import React, { useState } from 'react';

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
  bookReviews: Review[];
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({ bookList: [], bookReviews: [] });

  const addNewBook = (title: string, author: string) => {
    const nextBookId = appState.bookList.length + 1;
    const newBook: Book = {
      id: nextBookId,
      title,
      author,
    };
    setAppState((previousState) => ({
      ...previousState,
      bookList: [...previousState.bookList, newBook],
    }));
  };

  const addNewReview = (bookId: number, content: string) => {
    const newReview: Review = {
      bookId,
      content,
    };
    setAppState((previousState) => ({
      ...previousState,
      bookReviews: [...previousState.bookReviews, newReview],
    }));
  };

  const listReviewsByBookId = (bookId: number) => {
    return appState.bookReviews.filter((review) => review.bookId === bookId);
  };

  return (
    <div>
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
                <div key={index}>{review.content}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => addNewBook('New Title', 'New Author')}>Add Book</button>
      </div>
    </div>
  );
};

export default App;