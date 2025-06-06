import { loginUsingOAuth } from "../utils/generateOktoAuthToken";

export async function authenticate(idToken: string, provider: string) {
  const token = await loginUsingOAuth(idToken, provider);
  return token;
}
