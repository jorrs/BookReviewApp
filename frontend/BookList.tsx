import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const viewReviews = (bookId: number) => () => {
    alert(`Viewing reviews for book ID: ${bookId}`);
  };

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          Title: {book.title}, Author: {book.author}
          <button onClick={viewReviews(book.id)}>View Reviews</button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
