# FormSaathi AI

**Big paperwork. Clear next steps.**

FormSaathi AI helps people understand public-service notices, scholarships, admission circulars, and other important instructions. Paste notice text or upload an image. The app extracts text, identifies deadlines and required documents, and turns the information into a source-aware action brief.

> FormSaathi AI is an independent informational tool, not an official government service or an eligibility/legal authority. Always confirm important details against the original notice.

## Project structure

```text
formsathi_ai/
├── user/             # React + Vite user interface
└── admin/            # Express API, OCR, and AI provider
```

## Features

- Paste text or upload a JPG, PNG, or WEBP notice image (up to 5 MB).
- Server-side OCR for uploaded images.
- Extract key points, possible deadlines, document mentions, eligibility clues, and next steps.
- Hindi and English response preference.
- AI mode via an OpenAI-compatible hosted inference endpoint.
- Clearly labelled heuristic demo mode when AI settings are not configured.
- API keys are only read by the backend and must never be placed in browser code.
- Uploaded images are processed in memory and are not intentionally saved as permanent files.

## Requirements

- Node.js 20 or newer
- npm
- Optional: a hosted inference endpoint and credentials for an available open-weight model

## Run locally

### 1. Start the backend

Open a terminal in the repository root:

```bash
cd admin
npm install
```

Create your local environment file:

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

**macOS/Linux**
```bash
cp .env.example .env
```

Edit `admin/.env` if you want real AI. Then start the API:

```bash
npm run dev
```

The API runs at `http://localhost:3001`. Check it at `http://localhost:3001/api/health`.

### 2. Start the user interface

Open a second terminal at the repository root:

```bash
cd user
npm install
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`.

## Configure a hosted open-weight model

Set these variables in `admin/.env`:

- `AI_BASE_URL`: OpenAI-compatible API base URL or full chat-completions endpoint.
- `AI_API_KEY`: provider API key, if required.
- `AI_MODEL`: model identifier supported by your provider.
- `PORT`: backend port (defaults to `3001`).
- `CLIENT_ORIGIN`: frontend origin (defaults to `http://localhost:5173`).

Use a provider/model actually available to your account. Prices, free quotas, privacy terms, and rate limits vary. Never commit `admin/.env` or expose the key to the frontend. Without a configured endpoint and model, the server uses heuristic demo output; it does not pretend that demo output came from an AI model.

## API endpoints

- `GET /api/health`: service health and whether AI settings appear configured.
- `POST /api/analyze`: accepts multipart form fields `text`, `language` (`en` or `hi`), and optional image field `image`.

## Privacy and limitations

When AI is configured, extracted notice text is sent to the selected inference provider. Read that provider's data policy before submitting sensitive documents. Do not upload unnecessary personal data. OCR may misread low-quality images. Results can be wrong or incomplete: verify deadlines, fees, eligibility, and required documents directly against the official source.

## Deployment

Deploy `user/` as a static frontend and `admin/` as a Node.js service, for example through DigitalOcean App Platform. Configure the API URL/proxy for production, and set backend environment variables in the host's secret settings. A GitHub repository is not a live deployment; verify the deployed URL and health endpoint after hosting.

## License

MIT. See [LICENSE](LICENSE).
