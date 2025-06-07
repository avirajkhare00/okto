import { getoktaAuthTokenDetails, sendEmailOTP, verifyEmailOTP } from './oktoApiClient';

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

document.getElementById('otpSubmitBtn')?.addEventListener('click', () => {
  const otpInput = document.getElementById('otp') as HTMLInputElement | null;
  const emailInput = document.getElementById('email') as HTMLInputElement | null;
  const otpValue: string = otpInput?.value || '';
  const emailValue: string = emailInput?.value || '';
  const emailOtpToken: string = window.localStorage.getItem('emailOtpToken') || '';
  verifyEmailOTP(emailValue, otpValue, emailOtpToken);
});
