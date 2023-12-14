/**
 * @fileoverview Encryption service
 * @namespace EncryptionService
 */

import crypto from 'crypto';

/* Check environment variables */
if (!process.env.CRYPTO_ALGO) {
    throw new Error('No algorithm defined');
}

if (!process.env.CRYPTO_SECRET) {
    throw new Error('No secret key defined');
}

/* Constants */
const ALGORITHM: string = process.env.CRYPTO_ALGO;
const SECRET_KEY: string = process.env.CRYPTO_SECRET; // Must be 256 bytes (32 characters)

/**
 * @namespace EncryptionService
 * @description Encryption service
 */
namespace EncryptionService {
    /**
     * Decrypt a text
     * @param text - The text to encrypt
     * @returns {{iv: string; content: string}} - The encrypted text
     */
    export const encrypt = (text: crypto.BinaryLike): { iv: string; content: string } => {
        const iv: Buffer = crypto.randomBytes(16); // Generate a new IV for each encryption
        const cipher: crypto.Cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
        const encrypted: Buffer = Buffer.concat([cipher.update(text), cipher.final()]);

        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    };

    /**
     * Decrypt a text
     * @param iv - The initialization vector
     * @param content - The encrypted text
     * @returns {string} - The decrypted text
     */
    export const decrypt = (iv: string, content: string): string => {
        const decipher: crypto.Decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, Buffer.from(iv, 'hex'));
        const decrypted: Buffer = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);

        return decrypted.toString();
    }
}

export {EncryptionService};
