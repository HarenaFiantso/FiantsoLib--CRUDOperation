import React, { useState, useEffect } from 'react';
import Book from '../../type/BookType';
import axios from 'axios';

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/book');
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <>
      <h1>
        Welcome to <span>FiantsoLib</span>
      </h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            {book.cover && <img src={book.cover} alt="book cover" />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span>$ {book.price}</span>
            <button className="delete">Delete</button>
            <button className="update">Update</button>
          </div>
        ))}
      </div>

      <button className="addBook">Add new book</button>
    </>
  );
};

export default BookPage;
