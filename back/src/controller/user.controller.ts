import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Op } from "sequelize";
import { Request, Response } from 'express';


/** Check if all environment variables are defined */
const ENV_VARS = [
    {"JWT_SECRET": process.env.JWT_SECRET},
    {"SALT_ROUNDS": process.env.SALT_ROUNDS},
    {"JWT_TOKEN_EXPIRATION": process.env.JWT_TOKEN_EXPIRATION},
];

ENV_VARS.forEach((envVar) => {
    const key = Object.keys(envVar)[0];
    const value = Object.values(envVar)[0];
    if (!value) {
        throw new Error(`${key} is not defined in the environment variables`);
    }
});

/** Get typed environment variables. */
const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS);

if (isNaN(SALT_ROUNDS)) {
    throw new Error('SALT_ROUNDS environment variable is not a valid number');
}

/**
 * Login user
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} This returns the user object if successful or an error message if unsuccessful
 */
const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // check if username and password are provided
        if (!username || !email || !password) {
            res.status(400).json({ error: "Please provide username, email and password" });
            return;
        }

        if (await User.findOne({ where: { [Op.or]: [{ username: username }, { email: email }] } })) {
            res.status(400).json({ error: "Username or email already exists" });
            return;
        }

        const hashedPassword: string = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        res.status(201).json(user);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
}

/**
 * Login user
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} This returns the token if successful or an error message if unsuccessful
 */
const login = async (req: Request, res: Response): Promise<void> => {
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
        const match: boolean = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(401).json({ error: "Incorrect password" });
            return;
        }

        // create token
        const token: string = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
        res.status(200).json({ token });
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: "An unexpected error occurred" });
    }
}

/**
 * Logout user session
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} For now it returns nothing for a potential future implementation
 */
const logout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success : "User logout correctly"})
}

export { register, login, logout };
