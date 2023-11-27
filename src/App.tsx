import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookPage from './pages/bookPage/BookPage';
import AddBookPage from './pages/addBookPage/AddBookPage';
import UpdateBookPage from './pages/updateBookPage/UpdateBookPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookPage />}></Route>
          <Route path="/add" element={<AddBookPage />}></Route>
          <Route path="/update/:id" element={<UpdateBookPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
