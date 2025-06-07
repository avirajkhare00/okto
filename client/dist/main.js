import { getoktaAuthTokenDetails } from './oktoApiClient.js';
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
