# FormSaathi AI

**Big paperwork. Clear next steps.**

FormSaathi AI helps people understand public-service notices, scholarship circulars, admission instructions, and other important documents. Paste notice text, paste a copied image with **Ctrl+V**, or upload a JPG/PNG/WEBP photo. The app extracts readable text, highlights date and document mentions, and turns the source into a practical action brief.

> FormSaathi AI is an independent informational tool, not an official government service or an eligibility/legal authority. Always confirm important details against the original notice.

## Project structure

```text
formsathi_ai/
├── user/                   # Plain HTML, CSS, and JavaScript frontend
├── admin/                  # Node.js + Express API, OCR, AI integration
├── .do/app.yaml            # DigitalOcean App Platform deployment spec
└── .github/workflows/ci.yml
```

The user interface has no React, Vite, or frontend framework dependency. It consists of `user/index.html`, `user/styles.css`, and `user/app.js`.

## Features

- Paste notice text or paste an image from your clipboard with Ctrl+V.
- Upload JPG, PNG, or WEBP notice images up to 5 MB.
- OCR for English and Hindi image text (configurable).
- Extract key points, date mentions, document requirements, eligibility clues, and next steps.
- English or Hindi explanations.
- Hosted open-weight model integration through an OpenAI-compatible chat-completions API.
- Clearly labelled rule-based demo mode when no model is configured.
- AI-generated evidence quotes are checked against the submitted source text; unsupported quotes are removed.
- Uploads are processed in memory and are not intentionally saved as permanent files.
- API keys remain on the backend.

## Requirements

- Node.js 20 or newer
- Python 3 (for the built-in static development server) or VS Code Live Server
- For real AI mode: access to a compatible hosted inference API and an available open-weight model

## Run locally

Open two terminals from the repository root.

### 1. Start the API

In Terminal 1:

```powershell
cd admin
npm install
Copy-Item .env.example .env
npm run dev
```

The API runs at `http://localhost:3001`. Verify it at [http://localhost:3001/api/health](http://localhost:3001/api/health).

### 2. Start the plain HTML website

In Terminal 2:

```powershell
cd user
python -m http.server 5173
```

On Windows, if `python` is not recognized, try `py -m http.server 5173`. Open [http://localhost:5173](http://localhost:5173).

Alternatively, open the `user/` folder in VS Code and use the Live Server extension. The backend accepts local development origins, and the frontend calls the API at port 3001 on localhost.

Do not open `index.html` by double-clicking it as a `file://` URL; browsers restrict API requests from local files.

## Configure a hosted open-weight model

Set these variables in `admin/.env`:

- `AI_BASE_URL`: base URL for an OpenAI-compatible API or a full `/chat/completions` endpoint.
- `AI_API_KEY`: provider API key, if required.
- `AI_MODEL`: exact model identifier supported by the provider.
- `OCR_LANGS`: optional OCR language string; defaults to `eng+hin`.
- `PORT`: optional backend port; defaults to `3001`.
- `CLIENT_ORIGIN`: comma-separated allowed frontend origins; defaults to `http://localhost:5173`.

Use an open-weight model that your provider actually makes available. Price, credits, free quotas, data retention, and supported parameters vary. Never expose keys in frontend code or commit `admin/.env`.

Without `AI_BASE_URL` and `AI_MODEL`, the app returns rule-based demo results with a visible Demo Mode label. These results are not AI-generated.

### Image OCR note

On first image analysis, Tesseract.js may download the configured OCR language data into its runtime cache. This is OCR language data, not a local generative AI model. Internet access is needed for the first uncached OCR run. If you use only pasted text, OCR data is not needed.

## API endpoints

- `GET /api/health`: service status, AI configuration indicator, and OCR language setting.
- `POST /api/analyze`: multipart fields `text`, `language` (`en` or `hi`), and optional file field `image`.

## Tests

The GitHub Actions workflow checks JavaScript syntax, verifies the plain static assets, builds the backend, and runs API smoke tests. You can run the backend checks locally:

```powershell
cd admin
npm install
node --check index.js
npm test
```

## Deploy to DigitalOcean App Platform

A starter App Platform specification is provided at `.do/app.yaml`. Create an App from this GitHub repository and select the specification. Review the component settings, region availability, and billing before deploying. The spec routes `/api/*` to the admin service and other paths to the static website.

After creating the App:
1. Add `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` as backend service environment variables in the DigitalOcean dashboard. Mark the API key as a secret.
2. Deploy and wait for the deployment to finish successfully.
3. Open the assigned app URL and check `/api/health`.
4. Submit a non-sensitive sample notice to test analysis.

Backend hosting may incur charges. Do not create cloud resources without reviewing current pricing and available credits. A repository or deployment specification alone does not mean the application is live.

## Privacy and limitations

When real AI is configured, extracted notice text is sent to the selected inference provider. Review that provider's data policy before submitting sensitive material and avoid uploading unnecessary personal information. OCR can misread low-quality or handwritten notices. AI may omit or misinterpret details; confirm dates, fees, eligibility, and required documents directly against the official source.

## License

MIT. See [LICENSE](LICENSE).
