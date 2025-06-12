import { loginUsingOAuth } from "../utils/generateOktoAuthToken";

export async function authenticate(idToken: string, provider: string) {
  const result = await loginUsingOAuth(idToken, provider);
  if (!result) throw new Error('Authentication failed');
  const { sessionConfig, authToken } = result;
  console.log('final token', authToken);
  return {
    sessionConfig,
    authToken
  };
}
