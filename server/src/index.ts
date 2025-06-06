import { sendOtp, verifyOtp } from './auth/emailAuthenticate';
import { authenticate } from './auth/authenticate';
import express from 'express';
import { Request, Response } from 'express';
import { verifySession } from './auth/verifySession';

const app = express();

app.use(express.json())

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({
    "message": "pong"
  })
})

app.post('/api/email/send-otp', async (req: Request, res: Response) => {
  const result = await sendOtp(req.body.email);
  res.status(201).json(result);
});

app.post('/api/email/verify-otp', async (req: Request, res: Response) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const token = req.body.token;
  const result = await verifyOtp(token, otp, email);
  res.status(201).json(result);
});

app.post('/api/email/authenticate', async (req: Request, res: Response) => {
  const idToken = req.body.idToken;
  const provider = req.body.provider;
  const result = authenticate(idToken, provider);
  res.status(200).json(result);
})

app.post('/api/google/authenticate', async (req: Request, res: Response) => {
  const idToken = req.body.idToken;
  const provider = 'google';
  const result = await authenticate(idToken, provider);
  res.status(200).json(result);
});

app.get('/api/verify-session', async (req: Request, res: Response) => {
  const idToken = req.headers.authorization?.split(' ')[1] || '';
  const resp = await verifySession(idToken);
  res.status(200).json(resp);
});

app.listen(8000);
