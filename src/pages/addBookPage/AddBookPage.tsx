import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddBookPage: React.FC = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  });
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/book', book);
      navigate('/');
    } catch (err: any) {
      console.log(err);
      setError(true);
    }
  };
  console.log(book);
  

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
      <textarea
        rows={5}
        placeholder="Book desc"
        name="desc"
        value={book.desc}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        value={book.price ?? ''}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        value={book.cover}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && <span>Something went wrong!</span>}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default AddBookPage;
