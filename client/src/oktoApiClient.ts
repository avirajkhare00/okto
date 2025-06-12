export async function getOktoAuthTokenDetails(token: string) {
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

export async function verifyEmailOTPAndGetSessionObj(email: string, otp: string, emailOtpToken: string) {
  const result = await fetch('https://okto-production.up.railway.app/api/email/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, otp: otp, token: emailOtpToken }) })
  if (!result.ok) {
    throw new Error("Network error!!!");
  }
  const respJson = await result.json();
  window.localStorage.setItem('sessionObj', respJson);
  return respJson;
}

export async function executeTokenTransfer(receiptAddress: string, receiptAmount: number, session: any) {
  const result = await fetch('https://okto-production.up.railway.app/api/token-transfer', {
    method: 'POST', headers: { 'Authorization': `Bearer ${session.authToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({
      senderAddress: receiptAddress,
      senderAmount: receiptAmount,
      sessionConfig: session.sessionConfig
    })
  });
  if (!result.ok) {
    throw new Error("Network error!!!");
  }
  const respJson = await result.json();
  return respJson;
}
