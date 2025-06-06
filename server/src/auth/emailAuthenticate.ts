import axios from 'axios';
import { generateClientSignature } from '../utils/generateClientSignature';
import { loginUsingOAuth } from '../utils/generateOktoAuthToken';
import type { Hex } from 'viem';
import dotenv from 'dotenv';

dotenv.config();

const client_swa = process.env.CLIENT_SWA as Hex;

/*
* function used to make a post request to okto staging api
*/
async function postSignedRequest(endpoint: string, fullPayload: any) {
  const payloadWithTimestamp = {
    ...fullPayload,
    timestamp: Date.now() - 1000, // Adjust timestamp to avoid clock skew issues
  };

  const signature = await generateClientSignature(payloadWithTimestamp);

  const requestBody = {
    data: payloadWithTimestamp,
    client_signature: signature,
    type: "ethsign",
  };

  console.log("Request Body:");
  const response = await axios.post(endpoint, requestBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

/**
 * This function sends an OTP to the user's Email-Id for authentication.
 */
export async function sendOtp(email: string) {
  const payload = {
    email: email, // Replace with the user's Email ID
    client_swa: client_swa, // Replace with your client_swa
  };

  try {
    console.log("Calling sendOtp with payload");
    const res = await postSignedRequest(
      "https://sandbox-api.okto.tech/api/oc/v1/authenticate/email",
      payload
    );
    console.log("OTP Sent:", res);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error (sendOTP):", error.response?.data);
      return error.response?.data;
    } else {
      console.error("Unexpected error:", error);
      return error;
    }
  }
}

/**
 * This function verifies the OTP received via Email.
 * It should be called with the token returned from the sendOtp() call, along with the OTP received via Eamil.
 */
export async function verifyOtp(token: any, otp: number, email: string) {
  const payload = {
    email: email, // Replace with the user's Email ID
    token: token,
    otp: otp,
    client_swa: client_swa, // Replace with your client_swa
  };

  try {
    const res = await postSignedRequest(
      "https://sandbox-api.okto.tech/api/oc/v1/authenticate/email/verify",
      payload
    );

    console.log("OTP Verified:", res);

    const data = res.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error (verifyOTP):", error.response?.data);
      return error.response?.data;
    } else {
      console.error("Unexpected error:", error);
      return error;
    }
  }
}
