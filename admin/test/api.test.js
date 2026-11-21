import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const adminDirectory = fileURLToPath(new URL('..', import.meta.url));

async function getFreePort() {
  const probe = createServer();
  await new Promise((resolve, reject) => {
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', resolve);
  });
  const { port } = probe.address();
  await new Promise((resolve, reject) => probe.close((error) => error ? reject(error) : resolve()));
  return port;
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

test('health and demo analysis endpoints respond', { timeout: 25_000 }, async (t) => {
  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ['server.js'], {
    cwd: adminDirectory,
    env: {
      ...process.env,
      PORT: String(port),
      CLIENT_ORIGIN: 'http://localhost:5173',
      AI_BASE_URL: '',
      AI_API_KEY: '',
      AI_MODEL: '',
      OCR_LANGS: 'eng'
    },
    stdio: 'ignore'
  });

  t.after(() => {
    if (!child.killed) child.kill('SIGTERM');
  });

  let healthResponse;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error('API server exited before it became healthy.');
    }
    try {
      healthResponse = await fetch(`${baseUrl}/api/health`);
      break;
    } catch {
      await wait(150);
    }
  }

  assert.ok(healthResponse, 'API server did not start within the expected time');
  assert.equal(healthResponse.status, 200);
  const health = await healthResponse.json();
  assert.equal(health.status, 'ok');
  assert.equal(health.aiConfigured, false);

  const deniedOriginResponse = await fetch(`${baseUrl}/api/health`, {
    headers: { Origin: 'https://not-allowed.example' }
  });
  assert.equal(deniedOriginResponse.status, 403);
  assert.match((await deniedOriginResponse.json()).error, /Origin not allowed/i);

  const form = new FormData();
  form.append('language', 'en');
  form.append('text', [
    'Post-Matric Scholarship Notice',
    'Submit the completed application before 15 November 2026.',
    'Required documents include an income certificate and latest marksheet.'
  ].join('\n'));

  const analysisResponse = await fetch(`${baseUrl}/api/analyze`, { method: 'POST', body: form });
  assert.equal(analysisResponse.status, 200);
  const analysis = await analysisResponse.json();
  assert.equal(analysis.mode, 'demo');
  assert.match(analysis.summary, /demo/i);
  assert.ok(Array.isArray(analysis.deadlines));
  assert.ok(analysis.deadlines.some((item) => item.date === '15 November 2026'));
  assert.ok(analysis.requiredDocuments.length > 0);

  const emptyForm = new FormData();
  emptyForm.append('language', 'en');
  emptyForm.append('text', '');
  const emptyResponse = await fetch(`${baseUrl}/api/analyze`, { method: 'POST', body: emptyForm });
  assert.equal(emptyResponse.status, 400);

  const invalidImageForm = new FormData();
  invalidImageForm.append('image', new Blob(['not an image'], { type: 'image/gif' }), 'notice.gif');
  const invalidImageResponse = await fetch(`${baseUrl}/api/analyze`, {
    method: 'POST',
    body: invalidImageForm
  });
  assert.equal(invalidImageResponse.status, 400);
  assert.match((await invalidImageResponse.json()).error, /JPG, PNG, or WEBP/i);

  const oversizedTextForm = new FormData();
  oversizedTextForm.append('language', 'en');
  oversizedTextForm.append('text', 'x'.repeat(30_001));
  const oversizedTextResponse = await fetch(`${baseUrl}/api/analyze`, {
    method: 'POST',
    body: oversizedTextForm
  });
  assert.equal(oversizedTextResponse.status, 413);
});
