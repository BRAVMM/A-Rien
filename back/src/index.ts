import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import bodyParser from 'body-parser';
import db from './models/index';
import cors from 'cors';
import UserRouter from './route/user.route';
import AreaRouter from './route/area.route';
import ServicesRouter from './route/services.route';
import {TaskScheduler} from './services/taskScheduler';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8080;
const INTERVAL: number = Number(process.env.INTERVAL);

if (isNaN(INTERVAL)) {
    throw new Error('Invalid INTERVAL value. Please check your environment variable.');
}

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
app.use('/area', AreaRouter);
app.use('/services', ServicesRouter);

/**
 * Execute each minute the checkTriggers function, which checks if a trigger is activated
 */
setInterval(async () => {
    try {
        console.log('Checking triggers... at ' + new Date().toLocaleString());
        await TaskScheduler.checkTriggers();
    } catch (error) {
        console.error('Error during trigger check:', error);
    }
}, INTERVAL); // 60000 ms = 1 minute

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
