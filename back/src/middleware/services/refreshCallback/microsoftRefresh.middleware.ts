import { OAuth } from "../../../models/oauth.model";
import getRefreshedToken from "../../../services/API/Microsoft/refreshToken.services";
import { EncryptionService } from "../../../services/encryption.service";

/**
 * Function to refresh  access tokens.
 * Iterates over an array of OAuth token objects from the database, each representing a Microsoft account.
 * For each token, it sends a request to Microsoft's API to refresh the access token using the stored refresh token.
 * The new access token is then encrypted and updated in the database.
 * 
 * @param {OAuth[]} tokens - Array of OAuth token objects to be refreshed. Each object must contain an encrypted refresh token and its associated IV (Initialization Vector).
 * 
 * @throws Will throw an error if unable to refresh any of the Microsoft tokens. This could happen due to network issues, invalid refresh token, or API errors.
 * 
 * @example
 * // Assuming 'tokens' is an array of OAuth objects from your database
 * await refreshMicrosoftTokens(tokens);
 * 
 * // On successful execution, each OAuth object in the database is updated with a new encrypted access token.
 * // On failure, an error is thrown with the message "Could not refresh Microsoft tokens".
 */
const refreshMicrosoftTokens = async (tokens : OAuth[]): Promise<void> => {
    for (const token of tokens) {
        const newAccessToken: string = await getRefreshedToken(EncryptionService.decrypt(token.ivRefresh, token.encryptedRefreshToken))

        if (newAccessToken) {
            const encryptedAccessToken : {iv: string, content: string} = EncryptionService.encrypt(newAccessToken)

            token.update({
                encryptedAccessToken: encryptedAccessToken.content,
                ivAccess: encryptedAccessToken.iv,
            });
        } else {
            throw new Error("Could not refresh Microsoft tokens")
        }

    }
}

export default refreshMicrosoftTokens
