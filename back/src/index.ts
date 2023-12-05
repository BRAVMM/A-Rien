import express from 'express';
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
