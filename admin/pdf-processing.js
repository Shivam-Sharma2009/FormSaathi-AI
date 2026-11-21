import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createWorker } from 'tesseract.js';

export const MAX_PDF_PAGES = 10;
export const MAX_PDF_TEXT_CHARS = 30_000;
const MAX_RENDER_PIXELS = 4_000_000;
const MAX_RENDER_WIDTH = 1_800;
const MAX_RENDER_HEIGHT = 2_400;
const OCR_TEXT_THRESHOLD = 20;

/**
 * Extracts embedded text from digital PDF pages and OCRs scanned/image-only pages.
 * The OCR callback is injectable so the page-by-page fallback can be tested without
 * downloading language models in the test suite.
 */
export async function processPdf(buffer, {
  ocrLanguages = 'eng+hin',
  ocrPage = null,
  maxPages = MAX_PDF_PAGES
} = {}) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 8) {
    throw Object.assign(new Error('The uploaded PDF is empty or invalid.'), { status: 400 });
  }

  const header = buffer.subarray(0, 1_024).toString('latin1');
  if (!header.includes('%PDF-')) {
    throw Object.assign(new Error('The uploaded file is not a valid PDF.'), { status: 400 });
  }

  const loadingTask = getDocument({
    data: new Uint8Array(buffer),
    isEvalSupported: false,
    enableScripting: false,
    enableXfa: false,
    useSystemFonts: true,
    stopAtErrors: true
  });

  let pdfDocument;
  let worker;
  const pageTexts = [];
  const ocrPages = [];
  const textPages = [];

  const recognizePage = async (imageBuffer, pageNumber) => {
    if (typeof ocrPage === 'function') {
      return ocrPage(imageBuffer, pageNumber);
    }

    if (!worker) worker = await createWorker(ocrLanguages);
    const result = await worker.recognize(imageBuffer);
    return String(result.data?.text || '').trim();
  };

  try {
    try {
      pdfDocument = await loadingTask.promise;
    } catch {
      throw Object.assign(new Error('This PDF could not be opened. It may be damaged, encrypted, or unsupported.'), { status: 400 });
    }

    if (!Number.isInteger(pdfDocument.numPages) || pdfDocument.numPages < 1) {
      throw Object.assign(new Error('The PDF does not contain any readable pages.'), { status: 400 });
    }

    if (pdfDocument.numPages > maxPages) {
      throw Object.assign(new Error(`PDFs can contain up to ${maxPages} pages. This file has ${pdfDocument.numPages} pages.`), { status: 413 });
    }

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
      const page = await pdfDocument.getPage(pageNumber);
      let pageText = '';

      try {
        const textContent = await page.getTextContent();
        pageText = textContent.items
          .map((item) => (typeof item.str === 'string' ? item.str : ''))
          .filter(Boolean)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        // A page with little or no embedded text is probably a scan.
        if (pageText.length < OCR_TEXT_THRESHOLD) {
          const baseViewport = page.getViewport({ scale: 1 });
          if (!Number.isFinite(baseViewport.width) || !Number.isFinite(baseViewport.height)
            || baseViewport.width <= 0 || baseViewport.height <= 0) {
            throw Object.assign(new Error(`Page ${pageNumber} has invalid dimensions.`), { status: 400 });
          }

          const pixelScale = Math.sqrt(MAX_RENDER_PIXELS / (baseViewport.width * baseViewport.height));
          const scale = Math.min(
            1.5,
            MAX_RENDER_WIDTH / baseViewport.width,
            MAX_RENDER_HEIGHT / baseViewport.height,
            pixelScale
          );
          const viewport = page.getViewport({ scale });
          const width = Math.max(1, Math.ceil(viewport.width));
          const height = Math.max(1, Math.ceil(viewport.height));
          const canvas = createCanvas(width, height);
          const context = canvas.getContext('2d');

          await page.render({ canvasContext: context, viewport }).promise;
          const imageBuffer = canvas.toBuffer('image/png');
          pageText = await recognizePage(imageBuffer, pageNumber);
          ocrPages.push(pageNumber);
          canvas.width = 1;
          canvas.height = 1;
        } else {
          textPages.push(pageNumber);
        }
      } finally {
        page.cleanup();
      }

      if (pageText) pageTexts.push(`[Page ${pageNumber}]\n${pageText}`);
      const combinedLength = pageTexts.reduce((total, value) => total + value.length + 2, 0);
      if (combinedLength > MAX_PDF_TEXT_CHARS) {
        throw Object.assign(new Error(`Extracted PDF text exceeds the ${MAX_PDF_TEXT_CHARS.toLocaleString()} character limit.`), { status: 413 });
      }
    }

    return {
      text: pageTexts.join('\n\n'),
      pageCount: pdfDocument.numPages,
      processedPages: pdfDocument.numPages,
      ocrPages,
      textPages
    };
  } finally {
    if (worker) await worker.terminate();
    if (pdfDocument) await pdfDocument.destroy();
    else await loadingTask.destroy().catch(() => {});
  }
}
