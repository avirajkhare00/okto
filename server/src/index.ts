import { sendOtp, verifyOtp } from './auth/emailAuthenticate';
import { authenticate } from './auth/authenticate';
import express from 'express';
import { Request, Response } from 'express';
import { verifySession } from './auth/verifySession';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({
    "message": "pong"
  })
})

app.post('/api/email/send-otp', async (req: Request, res: Response) => {
  const result = await sendOtp(req.body.email);
  res.status(200).json(result);
});

app.post('/api/email/verify-otp', async (req: Request, res: Response) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const token = req.body.token;
  const result = await verifyOtp(token, otp, email);
  res.status(200).json(result);
});

app.post('/api/email/authenticate', async (req: Request, res: Response) => {
  const idToken = req.body.idToken;
  const provider = 'okto';
  const result = await authenticate(idToken, provider);
  res.status(200).json(result);
})

app.post('/api/google/oauth', async (req: Request, res: Response) => {
  const jwtCredential = req.body.credential;
  const oktaAuthToken = await authenticate(jwtCredential, 'google');
  res.redirect(`http://localhost:8080?oktaAuthToken=${oktaAuthToken}`);
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

app.listen(8080);
