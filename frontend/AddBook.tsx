import React, { useState } from 'react';

type Book = {
  title: string;
  author: string;
  description: string;
};

interface BookProps {
  addBook: (book: Book) => void;
}

const NewBook: React.FC<BookProps> = ({ addBook }) => {
  const [book, setBook] = useState<Book>({ title: '', author: '', description: '' });
  const [notification, setNotification] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setBook({ ...book, [id]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addBook(book);
    // Notify user
    setNotification(`The book '${book.title}' by '${book.author}' has been added.`);
    
    // Reset the form
    setBook({ title: '', author: '', description: '' });
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <>
      {notification && <div style={{color: 'green', marginBottom: '10px'}}>{notification}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={book.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={book.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={book.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </>
  );
};

export default NewBook;