/**
 * @fileoverview User middleware
 * @namespace UserMiddleware
 */

/* Models */
import {User} from "../models/user.model";
import {Op} from "sequelize";

/* Services */
import {EncryptionService} from "../services/encryption.service";

/**
 * @namespace UserMiddleware
 * @description User middleware
 */
namespace UserMiddleware {
    /**
     * @description Get user from username
     * @param {string} username - This is the username
     * @returns {Promise<User | null>} - This returns the user object if successful or null if unsuccessful
     */
    export const getUserFromUsername = async (username: string): Promise<User | null> => {
        return await User.findOne({where: {username: username}});
    }

    /**
     * @description Get user from email
     * @param {string} email - This is the email
     * @returns {Promise<User | null>} - This returns the user object if successful or null if unsuccessful
     */
    export const getUserFromEmail = async (email: string): Promise<User | null> => {
        const hashedEmail: string = await EncryptionService.bcryptHash(email);
        return await User.findOne({where: {encryptedEmail: hashedEmail}});
    }
    

    /**
     * @description Get user from id
     * @param {number} id - This is the id
     * @returns {Promise<User | null>} - This returns the user object if successful or null if unsuccessful
     */
    export const getUserFromId = async (id: number): Promise<User | null> => {
        return await User.findOne({where: {id: id}});
    }

    /**
     * @description Check if user exists
     * @param {string} username - This is the username
     * @param {string} email - This is the email
     * @returns {Promise<boolean>} - This returns true if the user exists or false if the user doesn't exist
     */
    export const checkIfUserExists = async (username: string, email: string): Promise<boolean> => {
        const encryptedEmail = EncryptionService.encrypt(email);
        const user: User | null = await User.findOne({where: {[Op.or]: [{username: username}, {encryptedEmail: encryptedEmail.content}]}});

        return user !== null;
    }

    export const checkIfUserLoggedOauthUsername = async (username: string): Promise<boolean> => {
        const user: User | null = await User.findOne({where: {username: username}});

        return user !== null && user.isOauthLogged
    }

    export const checkIfUserLoggedOauthEmail = async (email: string): Promise<boolean> => {
        const encryptedEmail = EncryptionService.encrypt(email);
        const user: User | null = await User.findOne({where: {encryptedEmail: encryptedEmail.content}});

        return user !== null && user.isOauthLogged
    }
}

export {UserMiddleware};
