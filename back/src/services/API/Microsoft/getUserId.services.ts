const getMicrosoftUserId = async (email: string, accessToken: string) => {
    const url = `https://graph.microsoft.com/v1.0/users?$filter=mail eq '${email}'`;

    console.log(accessToken)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (!response?.ok) {
        console.error('Could not get microsoft user ID')
        console.log({"DATA : " : data})
        return null
    }
    console.log({"DATA : " : data})
    return data.value.length > 0 ? data.value[0].id : null;
};

export { getMicrosoftUserId }