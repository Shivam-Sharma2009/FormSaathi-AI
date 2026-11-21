import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { MAX_PDF_PAGES, processPdf } from '../pdf-processing.js';


function createTestPdf(pageTexts) {
  const objects = new Map();
  const pageIds = pageTexts.map((_, index) => 4 + (index * 2));
  objects.set(1, '<< /Type /Catalog /Pages 2 0 R >>');
  objects.set(2, `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
  objects.set(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  pageTexts.forEach((text, index) => {
    const pageId = pageIds[index];
    const contentId = pageId + 1;
    const escaped = String(text).replace(/[\\\\()]/g, '\\\\const adminDirectory = fileURLToPath(new URL('..', import.meta.url));');
    const stream = text
      ? `BT /F1 14 Tf 72 720 Td (${escaped}) Tj ET`
      : '';
    objects.set(pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentId} 0 R >>`);
    objects.set(contentId, `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\\nstream\\n${stream}\\nendstream`);
  });

  const maxObject = Math.max(...objects.keys());
  let pdf = '%PDF-1.4\\n';
  const offsets = new Array(maxObject + 1).fill(0);
  for (let objectId = 1; objectId <= maxObject; objectId += 1) {
    offsets[objectId] = Buffer.byteLength(pdf, 'latin1');
    pdf += `${objectId} 0 obj\\n${objects.get(objectId)}\\nendobj\\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'latin1');
  pdf += `xref\\n0 ${maxObject + 1}\\n0000000000 65535 f \\n`;
  for (let objectId = 1; objectId <= maxObject; objectId += 1) {
    pdf += `${String(offsets[objectId]).padStart(10, '0')} 00000 n \\n`;
  }
  pdf += `trailer\\n<< /Size ${maxObject + 1} /Root 1 0 R >>\\nstartxref\\n${xrefOffset}\\n%%EOF`;
  return Buffer.from(pdf, 'latin1');
}

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

  const pdfForm = new FormData();
  pdfForm.append('language', 'en');
  pdfForm.append('image', new Blob([createTestPdf([
    'Post Matric Scholarship Circular 2026: submit the completed application before 20 December 2026.',
    'Required documents include a current income certificate and the latest academic marksheet.'
  ])], { type: 'application/pdf' }), 'scholarship-notice.pdf');
  const pdfResponse = await fetch(`${baseUrl}/api/analyze`, { method: 'POST', body: pdfForm });
  assert.equal(pdfResponse.status, 200);
  const pdfAnalysis = await pdfResponse.json();
  assert.equal(pdfAnalysis.documentInfo.type, 'pdf');
  assert.equal(pdfAnalysis.documentInfo.pageCount, 2);
  assert.deepEqual(pdfAnalysis.documentInfo.textPages, [1, 2]);
  assert.deepEqual(pdfAnalysis.documentInfo.ocrPages, []);
  assert.match(pdfAnalysis.extractedText, /Page 1/);
  assert.match(pdfAnalysis.extractedText, /Page 2/);
  assert.match(pdfAnalysis.extractedText, /income certificate/);

  const invalidPdfForm = new FormData();
  invalidPdfForm.append('image', new Blob(['not a pdf'], { type: 'application/pdf' }), 'broken.pdf');
  const invalidPdfResponse = await fetch(`${baseUrl}/api/analyze`, { method: 'POST', body: invalidPdfForm });
  assert.equal(invalidPdfResponse.status, 400);
  assert.match((await invalidPdfResponse.json()).error, /valid PDF/i);

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

test('PDF processor OCRs every scanned page in a multi-page document', async () => {
  const calls = [];
  const result = await processPdf(createTestPdf(['', '']), {
    ocrLanguages: 'eng',
    ocrPage: async (imageBuffer, pageNumber) => {
      assert.ok(Buffer.isBuffer(imageBuffer));
      assert.equal(imageBuffer.subarray(1, 4).toString('ascii'), 'PNG');
      calls.push(pageNumber);
      return `OCR text from scanned page ${pageNumber}`;
    }
  });

  assert.deepEqual(calls, [1, 2]);
  assert.equal(result.pageCount, 2);
  assert.deepEqual(result.ocrPages, [1, 2]);
  assert.deepEqual(result.textPages, []);
  assert.match(result.text, /OCR text from scanned page 1/);
  assert.match(result.text, /OCR text from scanned page 2/);
});

test('PDF processor rejects documents above the page limit', async () => {
  await assert.rejects(
    processPdf(createTestPdf(Array(MAX_PDF_PAGES + 1).fill('')), {
      ocrLanguages: 'eng',
      ocrPage: async () => ''
    }),
    (error) => error.status === 413 && /up to 10 pages/i.test(error.message)
  );
});
