import { executeTokenTransfer, sendEmailOTP, verifyEmailOTPAndGetSessionObj } from './oktoApiClient';

(async () => {
  // grab oktoAuthToken
  const URLParams = new URLSearchParams(window.location.search);
  const sessionObj = URLParams.get('sessionObj') || '';
  if (sessionObj !== '') {
    const decodedSession = atob(sessionObj);
    const session = JSON.parse(decodedSession);
    console.log('sessionObj', session);
    localStorage.setItem('session', JSON.stringify(session));
  }
  const session = localStorage.getItem('session') || '';
  if (session !== '') {
    const sessionDetailsDiv = document.getElementById('sessionDetails');
    if (sessionDetailsDiv) {
      sessionDetailsDiv.innerText = session;
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
  const session = localStorage.getItem('session') || '';
  if (session !== '') {
    const sessionObj = JSON.parse(session);
    executeTokenTransfer(receiptAddress, receiptAmount, sessionObj);
  }
});
