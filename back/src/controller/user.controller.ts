import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const db = require("../models/index");
const User = db.users;

dotenv.config();

/**
 * Create user
 * @param req This is the request object
 * @param res This is the response object
 * @returns {Promise<void>} This returns the user object if successful or an error message if unsuccessful
 */
const createUser = async (req: any, res: any): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
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
 * @returns {Promise<void>} This returns the user object and a token if successful or an error message if unsuccessful
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

exports.createUser = createUser;
exports.login = login;
