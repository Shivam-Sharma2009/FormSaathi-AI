# FormSaathi AI

**Big paperwork. Clear next steps.**

FormSaathi AI helps people understand public-service notices, scholarship circulars, admission instructions, and other important documents. Paste notice text, paste a copied image with **Ctrl+V**, or upload a JPG/PNG/WEBP photo. The app extracts readable text, highlights dates and document mentions, and turns the source into a practical action brief.

> FormSaathi AI is an independent informational tool, not an official government service or an eligibility/legal authority. Always confirm important details against the original notice.

## Project structure

```text
formsathi_ai/
├── user/                   # React + Vite frontend
├── admin/                  # Node.js + Express API, OCR, AI integration
├── .do/app.yaml            # DigitalOcean App Platform deployment spec
└── .github/workflows/ci.yml
```

## Features

- Paste notice text or paste an image from your clipboard with Ctrl+V.
- Upload JPG, PNG, or WEBP notice images up to 5 MB.
- OCR for English and Hindi image text (configurable).
- Extract key points, date mentions, document requirements, eligibility clues, and next steps.
- English or Hindi explanations.
- Hosted open-weight model integration through an OpenAI-compatible chat-completions API.
- Clearly labeled rule-based demo mode when no model is configured.
- AI-generated evidence quotes are checked against the submitted source text; unsupported quotes are removed.
- Uploads are processed in memory and are not intentionally saved as permanent files.
- API keys remain on the backend.

## Requirements

- Node.js 20 or newer
- npm
- For real AI mode: access to a compatible hosted inference API and an available open-weight model

## Run locally

Use two terminals from the repository root.

### 1. Start the API

```powershell
cd admin
npm install
Copy-Item .env.example .env
npm run dev
```

The API runs at `http://localhost:3001`. Verify it at [http://localhost:3001/api/health](http://localhost:3001/api/health).

### 2. Start the website

In a second terminal:

```powershell
cd user
npm install
npm run dev
```

Open the URL shown by Vite, normally [http://localhost:5173](http://localhost:5173).

The Vite development server proxies `/api` requests to the local backend. Keep the API running while using the site.

## Enable real AI

Edit `admin/.env` and set the following values for a hosted, OpenAI-compatible inference endpoint:

- `AI_BASE_URL`: base URL, such as an endpoint ending in `/v1`, or the full `/chat/completions` endpoint.
- `AI_API_KEY`: provider key, if required.
- `AI_MODEL`: exact model identifier supported by the provider.
- `OCR_LANGS`: optional OCR language string; defaults to `eng+hin`.
- `PORT`: optional backend port; defaults to `3001`.
- `CLIENT_ORIGIN`: allowed browser origin for cross-origin deployment; defaults to `http://localhost:5173`.

Use an open-weight model that your provider actually makes available. Price, credits, usage limits, data retention, and supported parameters vary. Do not assume any provider is free. Never expose keys in the frontend or commit `admin/.env`.

Without `AI_BASE_URL` and `AI_MODEL`, the app returns rule-based demo results with a visible Demo Mode label. These results are not AI-generated.

### Image OCR note

On first image analysis, Tesseract.js may download its configured language data into its runtime cache. This is OCR language data, not a local generative AI model. Internet access is needed for the first uncached OCR run. If you only want to use pasted text, OCR data is not needed.

## API

- `GET /api/health`: service status, AI configuration indicator, and OCR language setting.
- `POST /api/analyze`: multipart fields `text`, `language` (`en` or `hi`), and optional file field `image`.

## Tests

From the repository root:

```powershell
cd user
npm install
npm run build
cd ../admin
npm install
npm test
node --check index.js
```

A GitHub Actions workflow runs the frontend build and backend smoke tests on pushes and pull requests.

## Deploy to DigitalOcean App Platform

A starter App Platform specification is provided at `.do/app.yaml`. In DigitalOcean, create an App from the GitHub repository and select this spec. Review the component settings and billing before deploying. The spec routes `/api/*` to the admin service and other paths to the static user interface, so a separate frontend API URL is not required for this configuration.

After creating the App:
1. Add `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` as backend service environment variables in the DigitalOcean dashboard. Mark the API key as a secret.
2. Trigger deployment and wait for the deployment to finish successfully.
3. Open the assigned app URL and check `/api/health`.
4. Submit a non-sensitive sample notice to test analysis.

DigitalOcean backend services may incur charges. Do not create resources without reviewing the current cost and available credits. A GitHub repository or deployment spec alone does not mean the application is live.

## Privacy and limitations

When real AI is configured, extracted notice text is sent to the selected inference provider. Review that provider's data policy before submitting sensitive material and avoid uploading unnecessary personal information. OCR can misread low-quality or handwritten notices. AI may omit or misinterpret details; confirm dates, fees, eligibility, and required documents directly against the official source.

## License

MIT. See [LICENSE](LICENSE).
