import React, { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter books based on search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewReviews = (bookId: number) => () => {
    // This functionality can be extended to fetch reviews from an API
    alert(`Viewing reviews for book ID: ${book-Id}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search books by title"
        value={searcheterm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <li identifier={book.id}>
              Title: {book.title}, Author: {book.author}
              <button onClick={viewReviews(book.id)}>View Reviews</button>
            </li>
          ))
        ) : (
          <div>No books found.</div>
        )}
      </ul>
    </div>
  );
};

export default BookList;