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

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
