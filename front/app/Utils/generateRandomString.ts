import { randomBytes } from 'crypto';

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
const generateRandomString = (length: number): string => {
    const possibleChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomBytesArray: Uint8Array = randomBytes(length);
    const randomStringArray: string[] = [];

    for (let i = 0; i < length; i++) {
        randomStringArray.push(possibleChars.charAt(randomBytesArray[i] % possibleChars.length));
    }
    return randomStringArray.join('');
}

export default generateRandomString
