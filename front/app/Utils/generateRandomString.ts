/**
 * Generates a random string of a given length using a specified set of characters.
 * This function is useful for creating unique identifiers, such as state parameters in OAuth authentication flows.
 * 
 * @param {number} length - The length of the random string to be generated.
 * @returns {string} - A random string composed of upper-case letters, lower-case letters, and digits.
 * 
 * @example
 * // Generate a random string of 16 characters
 * const randomState = generateRandomString(16);
 * 
 */
import { randomBytes } from 'crypto';

const generateRandomString = (length: number): string => {
    const possibleChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return randomBytes(length)
        .map((byte) => possibleChars.charAt(byte % possibleChars.length))
        .join('');
}
}

export default generateRandomString
