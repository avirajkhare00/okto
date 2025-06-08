import { executeTokenTransfer, getoktaAuthTokenDetails, sendEmailOTP, verifyEmailOTPAndGetAuthToken } from './oktoApiClient';
import { SessionKey } from './sessionKey';

(async () => {
  // grab oktaAuthToken
  const URLParams = new URLSearchParams(window.location.search);
  const oktaAuthToken = URLParams.get('oktaAuthToken') || '';

  if (oktaAuthToken !== '') {
    //store token in localstorage for easy retreival
    localStorage.setItem('oktaAuthToken', oktaAuthToken);
    //get session details from oktaAuthToken
    const sessionResult = await getoktaAuthTokenDetails(oktaAuthToken);
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
  const oktaAuthToken = await verifyEmailOTPAndGetAuthToken(emailValue, otpValue, emailOtpToken);
  const sessionResult = await getoktaAuthTokenDetails(oktaAuthToken);
  const sessionDetailsDiv = document.getElementById('sessionDetails');
  if (sessionDetailsDiv) {
    sessionDetailsDiv.innerText = JSON.stringify(sessionResult);
  }
});

document.getElementById('tokenTransferSubmitBtn')?.addEventListener('click', async () => {
  const receiptAddress = (document.getElementById('receiptAddress') as HTMLInputElement).value || '';
  const receiptAmount = parseInt((document.getElementById('receiptAmount') as HTMLInputElement).value) || 0;
  const oktaAuthToken = localStorage.getItem('oktaAuthToken') || '';
  const userSWA = (await getoktaAuthTokenDetails(oktaAuthToken))?.data?.user_swa;
  const session = SessionKey.create();
  const token = "";
  executeTokenTransfer(receiptAddress, receiptAmount, session, token, userSWA);
});
