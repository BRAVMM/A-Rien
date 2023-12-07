import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from "../models/index";

dotenv.config();

const User = db.users;
const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS) || 10;


/**
 * Register user
 * @param req This is the request object
 * @param res This is the response object
 * @returns {Promise<void>} This returns the user object if successful or an error message if unsuccessful
 */
const register = async (req: any, res: any): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // check if username and password are provided
        if (!username || !email || !password) {
            res.status(400).json({ error: "Please provide username, email and password" });
            return;
        }

        // check if user already exists
        if (await User.findOne({ where: { username: username } })
            || await User.findOne({ where: { email: email } })) {
            res.status(400).json({ error: "Username or email already exists" });
            return;
        }

        const hashedPassword: string = bcrypt.hashSync(password, SALT_ROUNDS);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Login user
 * @param req This is the request object
 * @param res This is the response object
 * @returns {Promise<void>} This returns the token if successful or an error message if unsuccessful
 */
const login = async (req: any, res: any): Promise<void> => {
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
        const jwtSecret: string = process.env.JWT_SECRET || '';
        const token: string = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

exports.register = register;
exports.login = login;
