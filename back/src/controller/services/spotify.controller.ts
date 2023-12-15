import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from "sequelize";
import { Request, Response } from 'express';

const registerToken = async (req: Request, res: Response): Promise<void> => {
    console.log('salut')
}

export { registerToken };
