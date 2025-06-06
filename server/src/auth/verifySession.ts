import axios from "axios";

const VERIFY_SESSION_URL = "https://sandbox-api.okto.tech/api/oc/v1/verify-session";

export async function verifySession(token: string) {
  const response = await axios.get(VERIFY_SESSION_URL, { headers: { 'Authorization': `Bearer ${token}` } });
  return response.data;
}
