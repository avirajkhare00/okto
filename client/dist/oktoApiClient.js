export async function getoktoAuthTokenDetails(token) {
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
export async function sendEmailOTP(email) {
  const result = await fetch('https://okto-production.up.railway.app/api/email/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email }) });
  if (!result.ok) {
    throw new Error("Network error!!!");
  }
  const respJson = await result.json();
  //store emailOtpToken
  window.localStorage.setItem('emailOtpToken', respJson.data.token);
  return respJson;
}
export async function verifyEmailOTPAndGetAuthToken(email, otp, emailOtpToken) {
  const result = await fetch('https://okto-production.up.railway.app/api/email/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, otp: otp, token: emailOtpToken }) });
  if (!result.ok) {
    throw new Error("Network error!!!");
  }
  const respJson = await result.json();
  const oktoAuthToken = respJson.auth_token;
  window.localStorage.setItem('oktoAuthToken', oktoAuthToken);
  return oktoAuthToken;
}
export async function executeTokenTransfer(receiptAddress, receiptAmount, session, token, userSWA) {
  const result = await fetch('https://okto-production.up.railway.app/api/token-transfer', {
    method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: JSON.stringify({
      senderAddress: receiptAddress,
      senderAmount: receiptAmount,
      sessionConfig: {
        sessionPrivKey: session.privateKeyHexWith0x,
        sessionPubKey: session.uncompressedPublicKeyHexWith0x,
        userSWA: userSWA
      }
    })
  });
  if (!result.ok) {
    throw new Error("Network error!!!");
  }
  const respJson = await result.json();
  return respJson;
}
