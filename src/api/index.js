const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
dotenv.config();

const app = express();
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

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
