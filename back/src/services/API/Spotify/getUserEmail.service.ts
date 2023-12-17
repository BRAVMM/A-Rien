/**
 * Asynchronously retrieves the email address of a user from Spotify's API using a given access token.
 * 
 * @param {string} token - The Spotify access token used to authorize the API request.
 * @returns {Promise<string>} - A promise that resolves to the user's email address as obtained from Spotify's API.
 * 
 * @throws Will throw an error if the fetch request fails, if the response status is not OK, or if the response cannot be parsed as JSON.
 */
const getUserEmail = async (token: string): Promise<string> => {
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const userData = await userResponse.json()
    return userData.email
}

export default getUserEmail
