import Cookies from 'js-cookie';
import {DataBody} from '../Interfaces/dataBody.interface';

/**
 * loginUser - Function to perform a user login by making an API call.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<any>} - A Promise that resolves to the JSON response from the API if successful, or rejects with an error if login fails.
 *
 * @throws {Error} If the login request fails.
 *
 * Usage:
 * ```
 * try {
 *   const json = await loginUser(username, password);
 *   // Handle successful login here
 * } catch (error) {
 *   // Handle login error here
 * }
 * ```
 */
export async function loginUser(username: string, password: string): Promise<any> {
  // Prepare the request data
  const data = {
    username: username,
    password: password,
  };

  try {
    // Make a POST request to the login endpoint with the provided data
    const response = await fetch(process.env.NEXT_PUBLIC_API + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if the response is OK (HTTP status code 2xx)
    if (response.ok) {
      // Parse the JSON response and return it if successful
      return await response.json();
    } else {
      // If the response is not OK, throw an error with a message
    //   throw the error
      const error = await response.json();
      throw new Error(error.error);
    }
  } catch (error) {
    // Handle any exceptions that may occur during the request
    throw error;
  }
}

/**
 * registerTokenService - Function that take a login token of a service and store it inside the database with an API call.
 *
 * @param {string} token - The token of the service logged in.
 * @param {string} serviceRoute - The route to store the token.
 * @returns {Promise<any>} - A Promise that resolves to the JSON response from the API if successful, or rejects with an error if login fails.
 *
 * @throws {Error} If the registerToken request fails.
 *
 * Usage:
 * ```
 * try {
 *   const json = await registerTokenService(token, serviceRoute);
 *   // Handle successful login here
 * } catch (error) {
 *   // Handle login error here
 * }
 * ```
 */
export async function registerTokenService(data : DataBody, serviceRoute : string): Promise<any> {
  try {
    const bearer = Cookies.get('token')

    const response = await fetch(process.env.NEXT_PUBLIC_API + serviceRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearer}`,
      },
      body: data.getString(),
    });
    if (!response.ok) {
      const error = await response.json();
      console.error(error.error);
      // throw new Error("an error occurred");
    }
  } catch (error) {
    throw error;
  }
}

export async function storeArea(name: string, actionId: number, reactionIds: number[], actionData: any, reactionData: any, oauthTokens: number[]): Promise<any> {
  try {
    const bearer = Cookies.get('token')

    const response = await fetch(process.env.NEXT_PUBLIC_API + "/area/storeArea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearer}`,
      },
      body: JSON.stringify({
        name: name,
        actionId: actionId,
        reactionIds: reactionIds,
        actionData: actionData,
        reactionsData: reactionData,
        oauthTokens: oauthTokens,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
  } catch (error) {
    throw error;
  }
}
