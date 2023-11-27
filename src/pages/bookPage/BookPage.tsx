import React, { useState, useEffect, useRef } from 'react';
import Book from '../../type/BookType';
import axios from 'axios';
import Typed from 'typed.js';

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['My World', 'FiantsoLib !'],
      loop: true,
      loopCount: Infinity,
      typeSpeed: 50,
      backDelay: 700,
      backSpeed: 100,
    });
    return () => {
      typed.destroy();
    };
  }, []);
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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8800/book/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="title">
        Welcome to <span ref={el}>FiantsoLib</span>
      </h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            {book.cover && (
              <img src={book.cover} alt="book cover" className="img" />
            )}
            <h2 className="book__title">{book.title}</h2>
            <p className="book__description">{book.description}</p>
            <span className="book__price">$ {book.price}</span>
            <div className="book__button">
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
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
