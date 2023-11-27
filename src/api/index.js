const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

/* Controller */
app.get("/", (req, res) => {
  res.json("Hello ! This server is created by Fiantso Harena");
});
app.get('/book', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM book');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/book/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const { rows } = await db.query('SELECT * FROM book WHERE id = $1', [
      bookId,
    ]);
    if (rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send('Error while receiving book');
  }
});
app.post('/book', (req, res) => {
  const q = 'INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.put('/book/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, description, price, cover } = req.body;
  try {
    const updateQuery = `
        UPDATE book 
        SET title = $1, description = $2, price = $3, cover = $4 
        WHERE id = $5
        RETURNING *
      `;
    const { rows } = await db.query(updateQuery, [
      title,
      description,
      price,
      cover,
      bookId,
    ]);
    if (rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send('Erreur lors de la mise à jour du livre');
  }
});
app.delete('/book/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const deleteQuery = 'DELETE FROM book WHERE id = $1 RETURNING *';
    const { rows } = await db.query(deleteQuery, [bookId]);
    if (rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json({ message: 'Book deleted successfully', deletedBook: rows[0] });
  } catch (error) {
    res.status(500).send('Error while deleting book');
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
