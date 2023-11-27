import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

/* Controller */
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
