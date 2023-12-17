/**
 * Asynchronously refreshes a Spotify access token using a provided refresh token.
 * Sends a POST request to Spotify's token endpoint to obtain a new access token.
 *
 * @param {string} refreshToken - The refresh token used to obtain a new access token from Spotify.
 * @returns {Promise<string>} - A promise that resolves to the new access token.
 *
 * @throws Will throw an error if the request to Spotify's API fails, if the response status is not OK, 
 *         or if the response cannot be parsed as JSON.
 * 
 */
const getRefreshedToken = async (refreshToken: string): Promise<string> => {
    const spotifyResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')
        },
        body: new URLSearchParams({
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }).toString()
    });
    const data = await spotifyResponse.json()

    return data.access_token
}

export default getRefreshedToken
