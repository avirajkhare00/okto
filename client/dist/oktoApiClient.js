export async function getoktaAuthTokenDetails(token) {
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    const result = await fetch('https://okto-production.up.railway.app/api/verify-session', { headers: headers });
    if (!result.ok) {
        throw new Error("Network error!!!");
    }
    const respJson = await result.json();
    return respJson;
}
