import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const db = require("../models/index");
import { User } from '../models/user.model';

console.log('Imported User:', User);
dotenv.config();

// CHECK ENV VARS
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

/**
 * Login user
 * @param req This is the request object
 * @param res This is the response object
 * @returns {Promise<void>} This returns the user object and a token if successful or an error message if unsuccessful
 */
const login = async (req: any, res: any): Promise<void> => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    try {
        const {username, password} = req.body;
        // check if username and password are provided
        if (!username || !password) {
            res.status(400).json({ error: "Please provide username and password" });
            return;
        }
        const user = await User.findOne({
            where: {
                username: username,
            }
        });

        // check if user exists
        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }

        // check if password matches
        const match: boolean = bcrypt.compareSync(password, user.password);
        if (!match) {
            res.status(401).json({ error: "Incorrect password" });
            return;
        }

        // create token
        const token: string = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: "An unexpected error occurred" });
    }
}

exports.login = login;
