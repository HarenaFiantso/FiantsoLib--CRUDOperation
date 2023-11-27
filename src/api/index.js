const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

/* Controller */
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
app.post('/book', async (req, res) => {
  const { title, description, price, cover } = req.body;
  try {
    const insertQuery = `
        INSERT INTO book (title, description, price, cover) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
      `;
    const { rows } = await db.query(insertQuery, [
      title,
      description,
      price,
      cover,
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).send('Error while creating book');
  }
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
