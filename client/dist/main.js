import { getoktaAuthTokenDetails, sendEmailOTP, verifyEmailOTPAndGetAuthToken } from './oktoApiClient.js';
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
    const oktaAuthToken = await verifyEmailOTPAndGetAuthToken(emailValue, otpValue, emailOtpToken);
    const sessionResult = await getoktaAuthTokenDetails(oktaAuthToken);
    const sessionDetailsDiv = document.getElementById('sessionDetails');
    if (sessionDetailsDiv) {
        sessionDetailsDiv.innerText = JSON.stringify(sessionResult);
    }
});
