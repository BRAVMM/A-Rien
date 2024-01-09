import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import bodyParser from 'body-parser';
import db from './models/index';
import cors from 'cors';
import UserRouter from './route/user.route';
import AreaRouter from './route/area.route';
import ServicesRouter from './route/services.route';
import AboutRouter from './route/about.route';
import {TaskScheduler} from './services/taskScheduler';
import {Service} from "./models/service.model";
import {Action} from "./models/action.model";
import {Reaction} from "./models/reaction.model";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8080;
const INTERVAL: number = Number(process.env.INTERVAL);

if (isNaN(INTERVAL)) {
    throw new Error('Invalid INTERVAL value. Please check your environment variable.');
}

// Initialize the database connection
db.sequelize.sync()// {force: true} to drop the tables and recreate them
    .then(() => {
        console.log('Database sync completed.');

        addServicesToDB().then(() => {
            console.log('Services added to DB');
        }).catch((err: any) => {
            console.error('Error adding services to DB:', err);
        });

        addActionsToDB().then(() => {
            console.log('Actions added to DB');
        }).catch((err: any) => {
            console.error('Error adding actions to DB:', err);
        });

        addReactionsToDB().then(() => {
            console.log('Reactions added to DB');
        }).catch((err: any) => {
            console.error('Error adding reactions to DB:', err);
        });
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

const addServicesToDB = async () => {
    const SERVICES: any[] = [
        {
            id: 1,
            name: 'Spotify',
            actionsId: [1, 2, 3, 4, 5, 6, 7],
            reactionsId: [1, 2],
        },
        {
            id: 2,
            name: 'Timer',
            actionsId: [8],
            reactionsId: [],
        }
    ];

    for (const service of SERVICES) {
        if (await Service.findOne({where: {name: service.name}})) {
            continue;
        }
        await Service.create({
            id: service.id,
            name: service.name,
            actionsIds: service.actionsId,
            reactionsIds: service.reactionsId,
        });
    }
};

const addActionsToDB = async () => {
    const ACTIONS: any[] = [
        {
            name: 'Spotify',
            actions: [
                {
                    id: 1,
                    name: 'New saved song',
                    description: 'When a new song is saved',
                    args: [],
                    reactionsIds: [1],
                },
                {
                    id: 2,
                    name: 'New saved album',
                    description: 'When a new album is saved',
                    args: [],
                    reactionsIds: [1],
                },
                {
                    id: 3,
                    name: 'New saved artist',
                    description: 'When a new artist is saved',
                    args: [{
                        title: "gender",
                        type: 'string',
                        description: "Enter a gender",
                    }],
                    reactionsIds: [1],
                },
                {
                    id: 4,
                    name: 'New created playlist',
                    description: 'When a new playlist is created',
                    args: [],
                    reactionsIds: [1],
                },
                {
                    id: 5,
                    name: 'New saved playlist',
                    description: 'When a new playlist is saved',
                    args: [],
                    reactionsIds: [1],
                },
                {
                    id: 6,
                    name: 'New saved song from genre',
                    description: 'When a new song is saved from a genre',
                    args: [{
                        title: "genre",
                        type: 'string',
                        description: 'Enter a genre',
                    }],
                    reactionsIds: [1],
                },
                {
                    id: 7,
                    name: 'New saved song from artist',
                    description: 'When a new song is saved from an artist',
                    args: [{
                        title: "artistId",
                        type: 'string',
                        description: 'Enter an artist id',
                    }],
                    reactionsIds: [1],
                },
            ]
        },
        {
            name: 'Timer',
            actions: [
                {
                    id: 8,
                    name: 'When X time stamped',
                    description: 'When X time is stamped (in minutes)',
                    args: [{
                        title: "timeNeeded",
                        type: 'number',
                        description: 'Enter a number (in minutes)',
                        range: [1, 1440],
                    }],
                    reactionsIds: [2],
                },
            ]
        }
    ];

    for (const service of ACTIONS) {
        for (const action of service.actions) {
            if (await Action.findOne({where: {name: action.name}})) {
                continue;
            }
            await Action.create({
                id: action.id,
                name: action.name,
                args: action.args,
                reactionsIds: action.reactionsIds,
            });
        }
    }
}


const addReactionsToDB = async () => {
    const REACTIONS: any[] = [
        {
            name: 'Spotify',
            reactions: [
                {
                    id: 1,
                    name: 'Add to playlist',
                    description: 'Add a song to a playlist',
                    args: [
                        {
                            title: "playlistId",
                            type: 'string',
                            description: "Enter a playlist id",
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Add random to playlist',
                    description: 'Add a random song to a playlist',
                    args: [
                        {
                            title: "playlistId",
                            type: 'string',
                            description: "Enter a playlist id",
                        },
                    ],
                },
            ]
        }
    ];

    for (const service of REACTIONS) {
        for (const reaction of service.reactions) {
            if (await Reaction.findOne({where: {name: reaction.name}})) {
                continue;
            }
            await Reaction.create({
                id: reaction.id,
                name: reaction.name,
                description: reaction.description,
                args: reaction.args,
            });
        }
    }
}



app.use('/about.json', AboutRouter);

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
