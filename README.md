# OKTO API Web Interface

This repository contains code for OKTO API web interface.

## Features

 - Signin via:
   - Google
   - Email
 - Transfer Tokens(BASE Testnet)

## Architecture

This repository is divided into client and server directories.

### Frontend

Vanilla HTML, CSS and TypeScript. `ts-loader` and `webpack` is used to bundle resulting js. It is getting served by nodejs server.

Network: `fetch` is used for get and post requests.

Storage: Browser's `localStorage` is used to persist data.

### Backend

express framework is used and `axios` package is used for making API calls.

Overall, very least amount of packages are installed to keep it lightweight.

## API Schema

```bash
API Schema
==========

GET /ping
---------
Description: Health check endpoint.

Response:
{
  "message": "pong"
}

---

POST /api/email/send-otp
-------------------------
Description: Sends an OTP to the specified email.

Request Body:
{
  "email": "user@example.com"
}

Response:
Returns a JSON object indicating the result of OTP dispatch.

---

POST /api/email/verify-otp
---------------------------
Description: Verifies the OTP against the provided token and email.

Request Body:
{
  "email": "user@example.com",
  "otp": "123456",
  "token": "otp_token"
}

Response:
Returns a JSON object indicating the result of OTP verification.

---

POST /api/email/authenticate
-----------------------------
Description: Authenticates a user using an ID token from the 'okto' provider.

Request Body:
{
  "idToken": "token_value"
}

Response:
Returns a JSON object with authentication result.

---

POST /api/google/oauth
----------------------
Description: Authenticates with Google OAuth and redirects with an Okto token.

Request Body:
{
  "credential": "google_jwt"
}

Response:
Redirects to: https://okto-production.up.railway.app?oktoAuthToken=<token>

---

POST /api/google/authenticate
-----------------------------
Description: Authenticates a user using an ID token from the 'google' provider.

Request Body:
{
  "idToken": "google_token"
}

Response:
Returns a JSON object with authentication result.

---

GET /api/verify-session
------------------------
Description: Verifies the user's session based on an ID token.

Headers:
Authorization: Bearer <idToken>

Response:
Returns a JSON object with session verification result.

---

POST /api/token-transfer
------------------------
Description: Transfers a native token using the provided session config and user ID token.

Headers:
Authorization: Bearer <idToken>

Request Body:
{
  "senderAddress": "0xSenderAddress",
  "senderAmount": 1000000000000000000,
  "sessionConfig": {
    // session configuration
  }
}

Response:
{
  "result": {
    // result of token transfer
  }
}
```

## Deployment

A `Dockerfile` is created at root of this directory. One can deploy container in PaaS of her choice.

Note:

1. Do not use this code in production.
2. Google signin might not work since app is not in production.
3. there might be an issue in user op signature.
