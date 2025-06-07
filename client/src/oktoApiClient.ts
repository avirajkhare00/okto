export async function getoktaAuthTokenDetails(token: string) {
  const headers = {
    'Authorization': `Bearer ${token}`
  }
  const result = await fetch('http://localhost:8000/api/verify-session', { headers: headers })
  if (!result.ok) {
    throw new Error("Network error!!!");
  }
  const respJson = await result.json();
  return respJson;
}
