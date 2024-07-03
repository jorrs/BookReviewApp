import React, { useState } from 'react';

type BookProps = {
  addBook: (book: { title: string; author: string; description: string }) => void;
};

const NewBook: React.FC<BookClickProps> = ({ addBook }) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addBook({ title, author, description });
    
    setTitle('');
    setAuthor('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default New