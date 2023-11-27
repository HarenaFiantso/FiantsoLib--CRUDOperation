import express from 'express';

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
