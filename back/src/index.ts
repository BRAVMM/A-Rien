import express from 'express';
const cors = require('cors');
import dotenv from 'dotenv';

const UserRouter = require('./route/user.route');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', UserRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
