import { onRequest } from 'firebase-functions/v2/https';
import app from './app.js';

export const api = onRequest({
  region: 'asia-south1',
  timeoutSeconds: 300,
  memory: '1GiB'
}, app);
