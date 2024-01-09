/**
 * Asynchronously retrieves the email address of a user from Spotify's API using a given access token.
 * 
 * @param {string} token - The Spotify access token used to authorize the API request.
 * @returns {Promise<string>} - A promise that resolves to the user's email address as obtained from Spotify's API.
 * 
 * @throws Will throw an error if the fetch request fails, if the response status is not OK, or if the response cannot be parsed as JSON.
 */
const getUserEmail = async (token: string): Promise<string> => {
    if (!token || token.length === 0) {
        throw new Error('Invalid token to get user email')
    }
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!userResponse.ok) {
        throw new Error(`Spotify API request failed with status: ${userResponse.status}`);
    }
    const userData = await userResponse.json()

    // if (!userData || !userData.email) {
    //     throw new Error('Email field is missing in the Spotify API response');
    // }
    return userData.email
}

const getUserEmailMicrosoft = async (token: string): Promise<string> => {
    if (!token || token.length === 0) {
        throw new Error('Invalid token to get user email');
    }

    const userResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!userResponse.ok) {
        console.log(userResponse);
        throw new Error(`Microsoft API request failed with status: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    if (!userData || !userData.mail) {
        throw new Error('Email field is missing in the Microsoft Graph API response');
    }

    return userData.mail;
};


export { getUserEmail, getUserEmailMicrosoft}