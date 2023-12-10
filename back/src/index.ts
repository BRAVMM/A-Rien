import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './models/index';
import cors from 'cors';
import UserRouter from './route/user.route';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

// Initialize the database connection
db.sequelize.sync()
    .then(() => {
      console.log('Database sync completed.');
    })
    .catch((err: any) => {
      console.error('Error syncing the database:', err);
    });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', UserRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
