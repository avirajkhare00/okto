import { executeTokenTransfer, getOktoAuthTokenDetails, sendEmailOTP, verifyEmailOTPAndGetSessionObj } from './oktoApiClient';
import { SessionKey } from './sessionKey';

(async () => {
  // grab oktoAuthToken
  const URLParams = new URLSearchParams(window.location.search);
  const sessionObj = URLParams.get('sessionObj') || '';
  const decodedSession = Buffer.from(sessionObj, 'base64').toString('utf-8');
  const session = JSON.parse(decodedSession);
  console.log('sessionObj', session);
  if (session.authToken !== '') {
    // call authenticate method in backend and store sessionObj
    //get session details from oktoAuthToken
    const sessionResult = await getOktoAuthTokenDetails(session.authToken);
    const sessionDetailsDiv = document.getElementById('sessionDetails');
    if (sessionDetailsDiv) {
      sessionDetailsDiv.innerText = JSON.stringify(sessionResult);
    }
  }

})();

document.getElementById('emailSubmitBtn')?.addEventListener('click', () => {
  const emailInput = document.getElementById('email') as HTMLInputElement | null;
  const emailValue = emailInput?.value || '';
  sendEmailOTP(emailValue);
});

document.getElementById('otpSubmitBtn')?.addEventListener('click', async () => {
  const otpInput = document.getElementById('otp') as HTMLInputElement | null;
  const emailInput = document.getElementById('email') as HTMLInputElement | null;
  const otpValue: string = otpInput?.value || '';
  const emailValue: string = emailInput?.value || '';
  const emailOtpToken: string = window.localStorage.getItem('emailOtpToken') || '';
  //lets verify also
  const sessionResult = await verifyEmailOTPAndGetSessionObj(emailValue, otpValue, emailOtpToken);
  const sessionDetailsDiv = document.getElementById('sessionDetails');
  if (sessionDetailsDiv) {
    sessionDetailsDiv.innerText = JSON.stringify(sessionResult);
  }
});

document.getElementById('tokenTransferSubmitBtn')?.addEventListener('click', async () => {
  const receiptAddress = (document.getElementById('receiptAddress') as HTMLInputElement).value || '';
  const receiptAmount = parseInt((document.getElementById('receiptAmount') as HTMLInputElement).value) || 0;
  const sessionObj = localStorage.getItem('sessionObj') || '';
  const userSWA = (await getOktoAuthTokenDetails(sessionObj))?.data?.user_swa;
  const session = SessionKey.create();
  executeTokenTransfer(receiptAddress, receiptAmount, session, sessionObj, userSWA);
});
