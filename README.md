# FormSaathi AI

**Big paperwork. Clear next steps.**

FormSaathi AI helps people understand public-service notices, scholarship circulars, admission instructions, and other important documents. Paste notice text, paste a copied image with **Ctrl+V**, or upload a JPG/PNG/WEBP photo. The app extracts readable text, highlights date and document mentions, and turns the source into a practical action brief.

> FormSaathi AI is an independent informational tool, not an official government service or an eligibility/legal authority. Always confirm important details against the original notice.

## Project structure

```text
formsathi_ai/
├── user/                   # Plain HTML, CSS, and JavaScript frontend
├── admin/                  # Node.js + Express API, OCR, AI integration
├── firebase.json           # Firebase Functions deployment configuration
└── .github/workflows/ci.yml
```

The browser UI has no React, Vite, or frontend framework dependency. It consists of `user/index.html`, `user/styles.css`, and `user/app.js`.

## Features

- Paste notice text or paste an image from your clipboard with Ctrl+V.
- Upload JPG, PNG, or WEBP notice images up to 5 MB.
- OCR for English and Hindi image text (configurable).
- Extract key points, date mentions, document requirements, eligibility clues, and next steps.
- English or Hindi explanations.
- Hosted open-weight model integration through an OpenAI-compatible chat-completions API. The default example configuration targets Gemma 4 through Google AI Studio.
- Clearly labelled rule-based demo mode when no model is configured.
- AI-generated evidence quotes are checked against the submitted source text; unsupported quotes are removed.
- Uploaded images are processed in memory and are not intentionally saved as permanent files.
- API keys remain on the backend.

## Requirements

- Node.js 20 or newer for the backend
- A browser and Python 3 (or VS Code Live Server) for local static frontend preview
- For real AI mode: access to a compatible hosted inference API and an available open-weight model

## Run locally

Open two terminals from the repository root.

### 1. Start the backend

Terminal 1:

```powershell
cd admin
npm install
Copy-Item .env.example .env
npm run dev
```

The API runs at `http://localhost:3001`. Verify it at [http://localhost:3001/api/health](http://localhost:3001/api/health).

### 2. Start the plain HTML website

Terminal 2:

```powershell
cd user
py -m http.server 5173
```

If `py` is not recognized, try `python -m http.server 5173`. Open [http://localhost:5173](http://localhost:5173).

Alternatively, open `user/` in VS Code and use the Live Server extension. The API allows localhost development origins. Do not double-click `index.html` as a `file://` URL.

## Configure a hosted open-weight model

Set these variables in `admin/.env`. The checked-in `.env.example` provides a starter configuration for Gemma 4 through Google AI Studio:

- `AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai`
- `AI_API_KEY`: a Google AI Studio / Gemini API key (keep it secret).
- `AI_MODEL=gemma-4-26b-a4b-it`

The Gemini API documents an OpenAI-compatible endpoint and lists Gemma 4 models. Free-tier availability and quotas can vary by account, region, and current product limits, so check AI Studio before relying on it.
- `OCR_LANGS`: optional OCR language string; defaults to `eng+hin`.
- `PORT`: optional local backend port; defaults to `3001`.
- `CLIENT_ORIGIN`: comma-separated allowed frontend origins; defaults to `http://localhost:5173`.

Use a model that your provider actually makes available. Google lists Gemma 4 API access and a free tier, but quota and account eligibility can vary. The hackathon includes a Best Use of Gemma 4 prize, so naming and using the exact open-weight model in the demo/README can make the project fit that category. Review data terms and quotas. Never expose keys in frontend files or commit `admin/.env`.

Without `AI_BASE_URL` and `AI_MODEL`, the app returns rule-based demo results with a visible Demo Mode label. These results are not AI-generated. To use Gemma 4, create an API key in Google AI Studio, set it as `AI_API_KEY` in `admin/.env`, and restart the backend.

### Image OCR note

On first image analysis, Tesseract.js may download configured OCR language data into its runtime cache. This is OCR language data, not a local generative AI model. Internet access is needed for the first uncached OCR run. If you only use pasted text, OCR data is not needed.

## API endpoints

- `GET /api/health` or `GET /health`: service health, AI configuration indicator, and OCR language setting.
- `POST /api/analyze` or `POST /analyze`: multipart fields `text`, `language` (`en` or `hi`), and optional file field `image`.

## Deploy Firebase Functions + Vercel

The backend is a Firebase Cloud Function (2nd gen) named `api`, configured for
`asia-south1`, Node.js 20, a five-minute timeout, and 1 GiB memory for OCR.
The frontend remains plain static HTML/CSS/JavaScript and has no framework build.
The deployed backend is intentionally demo-only until a permitted provider is
configured through Firebase's backend environment settings.

### A. Deploy the Firebase Function

From the repository root, install the Firebase CLI if needed, authenticate, and
select the Firebase project interactively:

```powershell
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only functions:api
```

The checked-in `firebase.json` points the Functions source at `admin/`. Do not
add a project ID to that file. Firebase reads the Node.js 20 runtime from
`admin/package.json`.

After deployment, copy the HTTPS function URL. It will look similar to
`https://asia-south1-YOUR_PROJECT.cloudfunctions.net/api`.

Set `CLIENT_ORIGIN` in the deployed function's environment to the exact HTTPS
origin of the Vercel site, without a path or trailing slash. Localhost and
127.0.0.1 origins remain allowed for development. Keep any provider key only
in backend environment configuration; do not put it in this repository.

### B. Deploy the static frontend on Vercel

1. Import this repository into Vercel.
2. Set **Root Directory** to `user`.
3. Select **Other** as the framework preset.
4. Leave **Build Command** empty; there is no framework build.
5. Use `.` as the output directory if Vercel asks for one, then deploy.

Before deploying or in a follow-up commit, set the existing API base meta tag in
`user/index.html` to the Firebase Function origin:

```html
<meta name="formsaathi-api-base" content="https://asia-south1-YOUR_PROJECT.cloudfunctions.net/api">
```

The value must not include `/api`; the frontend app appends the API paths.
After the Vercel deployment, set the Firebase `CLIENT_ORIGIN` value to the exact
Vercel origin and verify `/api/health` returns JSON with `status: "ok"`.

Do not deploy automatically from this repository. Until a permitted AI provider
is intentionally configured, confirm the UI shows its clearly labelled Demo
Mode results. Do not enable or copy the existing provider configuration from
any local `.env` file.

## Tests

The GitHub Actions workflow checks the static frontend files and JavaScript syntax, then runs backend syntax and API smoke tests. To run the backend checks locally:

```powershell
cd admin
npm install
node --check app.js
node --check server.js
node --check index.js
npm test
```

## Privacy and limitations

When real AI is configured, extracted notice text is sent to the selected inference provider. Review that provider's data policy before submitting sensitive material and avoid uploading unnecessary personal information. OCR can misread low-quality or handwritten notices. AI may omit or misinterpret details; confirm dates, fees, eligibility, and required documents directly against the official source.

## License

MIT. See [LICENSE](LICENSE).
