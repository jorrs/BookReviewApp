import React, { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookDepotProps> = ({ books }) => {
  // State for the search term
  const [searchText, setSearchText] = useState('');

  // Books filtered by search term
  const booksFiltered = books.filter(book =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleViewReviewsClick = (bookId: number) => () => {
    // Extend this function to fetch reviews from an API in the future
    alert(`Viewing reviews for book ID: ${bookId}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search books by title"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <ul>
        {booksFiltered.length > 0 ? (
          booksFiltered.map((book) => (
            <li key={book.id}> {/* Use proper key prop instead of identifier */}
              Title: {book.title}, Author: {this.book.author}
              <button onClick={handleViewReviewsClick(book.id)}>View Reviews</button>
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