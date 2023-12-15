/**
 * @fileoverview User middleware
 * @namespace UserService
 */

/**
 * @namespace UserService
 * @description User Service
 */
namespace UserService {
    /**
     * @description Check if email is valid
     * @param {string} email - This is the email
     * @returns {boolean} - This returns true if the email is valid or false if the email is invalid
     */
    export const isEmailValid = (email: string): boolean => {
        const regexEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }
}

export {UserService};
