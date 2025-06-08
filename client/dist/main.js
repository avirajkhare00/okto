import { executeTokenTransfer, getoktoAuthTokenDetails, sendEmailOTP, verifyEmailOTPAndGetAuthToken } from './oktoApiClient.js';
import { SessionKey } from './sessionKey.js';
(async () => {
  // grab oktoAuthToken
  const URLParams = new URLSearchParams(window.location.search);
  const oktoAuthToken = URLParams.get('oktoAuthToken') || '';
  if (oktoAuthToken !== '') {
    //store token in localstorage for easy retreival
    localStorage.setItem('oktoAuthToken', oktoAuthToken);
    //get session details from oktoAuthToken
    const sessionResult = await getoktoAuthTokenDetails(oktoAuthToken);
    const sessionDetailsDiv = document.getElementById('sessionDetails');
    if (sessionDetailsDiv) {
      sessionDetailsDiv.innerText = JSON.stringify(sessionResult);
    }
  }
})();
document.getElementById('emailSubmitBtn')?.addEventListener('click', () => {
  const emailInput = document.getElementById('email');
  const emailValue = emailInput?.value || '';
  sendEmailOTP(emailValue);
});
document.getElementById('otpSubmitBtn')?.addEventListener('click', async () => {
  const otpInput = document.getElementById('otp');
  const emailInput = document.getElementById('email');
  const otpValue = otpInput?.value || '';
  const emailValue = emailInput?.value || '';
  const emailOtpToken = window.localStorage.getItem('emailOtpToken') || '';
  //lets verify also
  const oktoAuthToken = await verifyEmailOTPAndGetAuthToken(emailValue, otpValue, emailOtpToken);
  const sessionResult = await getoktoAuthTokenDetails(oktoAuthToken);
  const sessionDetailsDiv = document.getElementById('sessionDetails');
  if (sessionDetailsDiv) {
    sessionDetailsDiv.innerText = JSON.stringify(sessionResult);
  }
});
document.getElementById('tokenTransferSubmitBtn')?.addEventListener('click', async () => {
  const receiptAddress = document.getElementById('receiptAddress').value || '';
  const receiptAmount = parseInt(document.getElementById('receiptAmount').value) || 0;
  const oktoAuthToken = localStorage.getItem('oktoAuthToken') || '';
  const userSWA = (await getoktoAuthTokenDetails(oktoAuthToken))?.data?.user_swa;
  const session = SessionKey.create();
  const token = "";
  executeTokenTransfer(receiptAddress, receiptAmount, session, token, userSWA);
});
