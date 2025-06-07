export async function getoktaAuthTokenDetails(token: string) {
  const headers = {
    'Authorization': `Bearer ${token}`
  }
  const result = await fetch('https://okto-production.up.railway.app/api/verify-session', { headers: headers })
  if (!result.ok) {
    throw new Error("Network error!!!");
  }
  const respJson = await result.json();
  return respJson;
}

export async function sendEmailOTP(email: string) {
  const result = await fetch('https://okto-production.up.railway.app/api/email/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email }) })
  if (!result.ok) {
    throw new Error("Network error!!!");
  }
  const respJson = await result.json();
  //store emailOtpToken
  window.localStorage.setItem('emailOtpToken', respJson.data.token);
  return respJson;
}

export async function verifyEmailOTPAndGetAuthToken(email: string, otp: string, emailOtpToken: string) {
  const result = await fetch('https://okto-production.up.railway.app/api/email/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, otp: otp, token: emailOtpToken }) })
  if (!result.ok) {
    throw new Error("Network error!!!");
  }
  const respJson = await result.json();
  const oktaAuthToken = respJson.auth_token;
  window.localStorage.setItem('oktaAuthToken', oktaAuthToken);
  return oktaAuthToken;
}
