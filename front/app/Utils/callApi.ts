export async function loginUser(username: string, password: string): Promise<any> {
  const data = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    throw error;
  }
}
