import {Request, Response} from 'express';

/* Models */
import {User} from '../models/user.model';

/* Middleware */
import {UserMiddleware} from "../middleware/user.middleware";

/* Services */
import {JwtService} from "../services/jwt.service";
import {EncryptionService} from "../services/encryption.service";
import {UserService} from "../services/user.service";
import {TokenData} from "../interfaces/token.interface";
import {CustomRequest} from "../interfaces/request.interface";
import { Op } from 'sequelize';
import { authenticateUser } from '../services/API/Google/authService.service';
import { OAuthData } from '../interfaces/token.interface';
import { GoogleUserInfo } from '../interfaces/googleInfo.interface';
import {getGoogleUserInfo} from '../services/API/Google/getUserEmail.service'

/**
 * Login user
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} This returns the user object if successful or an error message if unsuccessful
 */
const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, email, password} = req.body;

        // check if username and password are provided
        if (!username || !email || !password) {
            res.status(400).json({error: "Please provide username, email and password"});
            return;
        }
        if (!UserService.isEmailValid(email)) {
            res.status(400).json({error: "Please provide a valid email"});
            return;
        }
        if (await UserMiddleware.checkIfUserExists(username, email)) {
            res.status(400).json({error: "Username or email already exists"});
            return;
        }

        if (await UserMiddleware.checkIfUserLoggedOauthEmail(email)) {
            res.status(400).json({error: "Email already exists for an Oauth access"});
            return;
        }

        const hashedPassword: string = await EncryptionService.bcryptHash(password);
        const encryptedEmail: { iv: string, content: string } = EncryptionService.encrypt(email);
        const user: User = await User.create({
            username: username,
            encryptedEmail: encryptedEmail.content,
            ivEmail: encryptedEmail.iv,
            password: hashedPassword,
        });
        const token: string = JwtService.generateToken(user.id);
        res.status(201).json({token});
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

/**
 * Login user
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} This returns the token if successful or an error message if unsuccessful
 */
const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.body;

        // check if username and password are provided
        if (!username || !password) {
            res.status(400).json({error: "Please provide username and password"});
            return;
        }
        const user: User | null = await UserMiddleware.getUserFromUsername(username);

        // check if user exists
        if (!user) {
            res.status(401).json({error: "User not found"});
            return;
        }

        if (await UserMiddleware.checkIfUserLoggedOauthUsername(username)) {
            res.status(400).json({error: "Username already exists for an Oauth access"});
            return;
        }
        // check if password matches
        const match: boolean = await EncryptionService.bcryptCompare(password, user.password);
        ;
        if (!match) {
            res.status(401).json({error: "Incorrect password"});
            return;
        }

        // create token
        const token: string = JwtService.generateToken(user.id);
        res.status(200).json({token});
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

/**
 * Login user
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} This returns the token if successful or an error message if unsuccessful
 */
const loginGoogle = async (req: Request, res: Response): Promise<void> => {
    try {
        const { code, mobile } = req.body;

        // check if username and password are provided
        if (!code) {
            res.status(400).json({error: "Cannot found code in request body."});
            return;
        }
        const oauthData : OAuthData = await authenticateUser(code, mobile ? mobile : false);
        
        if (!oauthData.accessToken) {
            res.status(404).json({error: "OAuth google access token not found."})
        }
        const userInfo: GoogleUserInfo = await getGoogleUserInfo(oauthData.accessToken);

        if (!userInfo) {
            res.status(401).json({error: "User not found"});
            return;
        }
        const user: User | null = await UserMiddleware.getUserFromUsername(userInfo.name);

        if (!user) {
            const encryptedEmail: {iv: string, content: string} = EncryptionService.encrypt(userInfo.email);
            const newOauthUser: User = await User.create({
                username: userInfo.name,
                encryptedEmail: encryptedEmail.content,
                ivEmail: encryptedEmail.iv,
                password: "",
                isOauthLogged: true,
            });
            const token: string = JwtService.generateToken(newOauthUser.id);
            res.status(201).json({token})
            return;
        }
        const token: string = JwtService.generateToken(user.id);
        res.status(200).json({token});
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

/**
 * Logout user session
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} For now it returns nothing for a potential future implementation
 */
const logout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({success: "User logout correctly"})
}

/**
 * Get user info
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} This returns the user info if successful or an error message if unsuccessful
 */
const getUserInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: TokenData = (req as CustomRequest).user;

        if (!userData) {
            res.status(401).json({error: "User not found"});
            return;
        }
        const userId: number = userData.userId;
        const user: User | null = await UserMiddleware.getUserFromId(userId);
        if (!user) {
            res.status(401).json({error: "User not found"});
            return;
        }
        const decryptedEmail: string = EncryptionService.decrypt(user.ivEmail, user.encryptedEmail);
        res.status(200).json({username: user.username, email: decryptedEmail, id: user.id});
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

const updateUserUsername = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: TokenData = (req as CustomRequest).user;
        const {username} = req.body;

        if (!userData) {
            res.status(401).json({error: "User not found"});
            return;
        }
        const userId: number = userData.userId;
        const user: User | null = await UserMiddleware.getUserFromId(userId);
        if (!user) {
            res.status(401).json({error: "User not found"});
            return;
        }
        if (await UserMiddleware.checkIfUserExists(username, user.encryptedEmail)) {
            res.status(400).json({error: "Username already exists"});
            return;
        }
        user.username = username;
        await user.save();
        res.status(200).json({username: user.username});
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

const updateUserEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: TokenData = (req as CustomRequest).user;
        const {email} = req.body;

        if (!userData) {
            res.status(401).json({error: "User not found"});
            return;
        }
        const userId: number = userData.userId;
        const user: User | null = await UserMiddleware.getUserFromId(userId);
        if (!user) {
            res.status(401).json({error: "User not found"});
            return;
        }
        if (!UserService.isEmailValid(email)) {
            res.status(400).json({error: "Please provide a valid email"});
            return;
        }
        const encryptedEmail: { iv: string, content: string } = EncryptionService.encrypt(email);
        user.encryptedEmail = encryptedEmail.content;
        user.ivEmail = encryptedEmail.iv;
        await user.save();
        res.status(200).json({email: email});
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

const updateUserPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: TokenData = (req as CustomRequest).user;
        const {oldPassword, newPassword} = req.body;

        if (!userData) {
            res.status(401).json({error: "User not found"});
            return;
        }
        const userId: number = userData.userId;
        const user: User | null = await UserMiddleware.getUserFromId(userId);
        if (!user) {
            res.status(401).json({error: "User not found"});
            return;
        }
        if (!oldPassword) {
            res.status(400).json({error: "Old password is required"});
            return;
        }
        if (!await EncryptionService.bcryptCompare(oldPassword, user.password)) {
            res.status(401).json({error: "Incorrect password"});
            return;
        }
        if (!newPassword) {
            res.status(400).json({error: "New password is required"});
            return;
        }
        const hashedPassword: string = await EncryptionService.bcryptHash(newPassword);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({success: "Password updated"});
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

/**
 * Delete user account
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} This returns a success message if the account is deleted or an error message if unsuccessful
 */
const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    if (!(req as any).user) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }

    try {
        const userId: number = (req as any).user.userId;
        const user: User | null = await UserMiddleware.getUserFromId(userId);

        // check if user exists
        if (!user) {
            res.status(404).json({error: "User not found"});
            return;
        }

        // check if no other user has the same username
        const otherUsersWithSameUsername = await User.findAll({
            where: {
                username: user.username,
                id: { [Op.not]: userId } // exclude the current user from the search
            }
        });

        if (otherUsersWithSameUsername.length > 0) {
            res.status(400).json({error: "Cannot delete account, other user(s) have the same username"});
            return;
        }

        await User.destroy({
            where: { id: userId }
        });

        res.status(200).json({success: "Account deleted successfully"});
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
};

/**
 * Modify user username
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @returns {Promise<void>} This returns the updated user info if successful or an error message if unsuccessful
 */
const modifyUsername = async (req: Request, res: Response): Promise<void> => {
    if (!(req as any).user) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }

    try {
        const userId: number = (req as any).user.userId;
        const user: User | null = await UserMiddleware.getUserFromId(userId);

        if (!user) {
            res.status(404).json({error: "User not found"});
            return;
        }

        const {username, newUsername} = req.body;

        if (!username || !newUsername) {
            res.status(400).json({error: "Please provide username and newUsername"});
            return;
        }
        if (username === newUsername) {
            res.status(400).json({error: "Please provide a new username"});
            return;
        }
        if (username !== user.username) {
            res.status(400).json({error: "Please provide the correct username"});
            return;
        }
        if (await UserMiddleware.getUserFromUsername(newUsername)) {
            res.status(400).json({error: "Username already taken"});
            return;
        }

        await User.update({username: newUsername}, {where: {id: userId}});
        res.status(200).json({username: newUsername});

    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
};


export {register, login, loginGoogle, logout, getUserInfo, deleteAccount, modifyUsername, updateUserUsername, updateUserEmail, updateUserPassword};
