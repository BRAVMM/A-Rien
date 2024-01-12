import AsyncStorage from "@react-native-async-storage/async-storage";

import {DataBody} from "../Interfaces/dataBody.interface";

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
export async function loginUser(
    username: string,
    password: string,
): Promise<any> {
    // Prepare the request data
    const data = {
        username,
        password,
    };

    try {
        // Make a POST request to the login endpoint with the provided data
        const response = await fetch(
            process.env.EXPO_PUBLIC_API_URL + "/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
        );

        // Check if the response is OK (HTTP status code 2xx)
        if (response.ok) {
            // Parse the JSON response and return it if successful
            return await response.json();
        } else {
            // If the response is not OK, throw an error with a message
            //   throw the error
            throw await response.json();
        }
    } catch (error) {
        // Handle any exceptions that may occur during the request
        throw error;
    }
}

/**
 * registerTokenService - Function that take a login token of a service and store it inside the database with an API call.
 *
 * @param data
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
export async function registerTokenService(
    data: DataBody,
    serviceRoute: string,
): Promise<any> {
    try {
        const bearer = await AsyncStorage.getItem("token");

        const response = await fetch(
            process.env.EXPO_PUBLIC_API_URL + serviceRoute,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearer}`,
                },
                body: data.getString(),
            },
        );
        if (!response.ok) {
            const error = await response.json();
            console.error(error.error);
        }
    } catch (error) {
        throw error;
    }
}

export async function storeArea(
    name: string,
    actionId: number,
    reactionIds: number[],
    actionData: any,
    reactionData: any,
    oauthTokens: number[],
): Promise<any> {
    try {
        const bearer = await AsyncStorage.getItem("token");

        const response = await fetch(
            process.env.EXPO_PUBLIC_API_URL + "/area/storeArea",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearer}`,
                },
                body: JSON.stringify({
                    name,
                    actionId,
                    reactionIds,
                    actionData,
                    reactionsData: reactionData,
                    oauthTokens,
                }),
            },
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
    } catch (error) {
        return error;
    }
}

export async function eraseArea(areaId: number): Promise<boolean> {
    try {
        const bearer = await AsyncStorage.getItem("token");

        const response = await fetch(
            process.env.EXPO_PUBLIC_API_URL + "/area/eraseArea",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearer}`,
                },
                body: JSON.stringify({
                    areaId,
                }),
            },
        );
        if (!response.ok) {
            const error = await response.json();
            console.error(error.error);
            return false;
        }
    } catch (error) {
        return false;
    }
    return true;
}

export async function toggleArea(areaId: number): Promise<boolean> {
    try {
        const bearer = await AsyncStorage.getItem("token");

        const response = await fetch(
            process.env.EXPO_PUBLIC_API_URL + "/area/toggleArea",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearer}`,
                },
                body: JSON.stringify({
                    areaId,
                }),
            },
        );
        if (!response.ok) {
            const error = await response.json();
            console.error(error.error);
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
}
