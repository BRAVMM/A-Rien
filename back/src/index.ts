import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import dotenv from 'dotenv';
import db from './models/index';

const UserRouter = require('./route/user.route');

dotenv.config();

const dataBase = db;
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', UserRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
