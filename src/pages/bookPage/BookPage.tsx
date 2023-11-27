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
      <h1 className="title">
        Welcome to <span>FiantsoLib</span>
      </h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            {book.cover && (
              <img src={book.cover} alt="book cover" className="img" />
            )}
            <h2 className="book__title">{book.title}</h2>
            <p className="book__description">{book.description}</p>
            <span className='book__price'>$ {book.price}</span>
            <div className='book__button'>
              <button className="delete">Delete</button>
              <button className="update">Update</button>
            </div>
          </div>
        ))}
      </div>

      <button className="addBook">Add new book</button>
    </>
  );
};

export default BookPage;
