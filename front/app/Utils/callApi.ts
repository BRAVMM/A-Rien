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
      const json = await response.json();
      return json;
    } else {
      // If the response is not OK, throw an error with a message
      throw new Error("Login failed");
    }
  } catch (error) {
    // Handle any exceptions that may occur during the request
    throw error;
  }
}
