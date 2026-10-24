# FormSaathi AI

**Big paperwork. Clear next steps.**

FormSaathi AI helps people understand public-service notices, scholarship circulars, admission instructions, and other important documents. Paste notice text, paste a copied image with **Ctrl+V**, or upload a JPG/PNG/WEBP photo. The app extracts readable text, highlights date and document mentions, and turns the source into a practical action brief.

> FormSaathi AI is an independent informational tool, not an official government service or an eligibility/legal authority. Always confirm important details against the original notice.

## Project structure

```text
formsathi_ai/
├── user/                   # Plain HTML, CSS, and JavaScript frontend
├── admin/                  # Node.js + Express API, OCR, AI integration
├── netlify.toml            # Free static frontend deployment
├── render.yaml             # Free backend service blueprint
└── .github/workflows/ci.yml
```

The browser UI has no React, Vite, or frontend framework dependency. It consists of `user/index.html`, `user/styles.css`, and `user/app.js`.

## Features

- Paste notice text or paste an image from your clipboard with Ctrl+V.
- Upload JPG, PNG, or WEBP notice images up to 5 MB.
- OCR for English and Hindi image text (configurable).
- Extract key points, date mentions, document requirements, eligibility clues, and next steps.
- English or Hindi explanations.
- Hosted open-weight model integration through an OpenAI-compatible chat-completions API.
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

Set these variables in `admin/.env`:

- `AI_BASE_URL`: base URL for an OpenAI-compatible API or a full `/chat/completions` endpoint.
- `AI_API_KEY`: provider API key, if required.
- `AI_MODEL`: exact model identifier supported by the provider.
- `OCR_LANGS`: optional OCR language string; defaults to `eng+hin`.
- `PORT`: optional local backend port; defaults to `3001`.
- `CLIENT_ORIGIN`: comma-separated allowed frontend origins; defaults to `http://localhost:5173`.

Use a model that your provider actually makes available. Prices, credits, quotas, data-retention terms, and supported parameters vary. Never expose keys in frontend files or commit `admin/.env`.

Without `AI_BASE_URL` and `AI_MODEL`, the app returns rule-based demo results with a visible Demo Mode label. These results are not AI-generated.

### Image OCR note

On first image analysis, Tesseract.js may download configured OCR language data into its runtime cache. This is OCR language data, not a local generative AI model. Internet access is needed for the first uncached OCR run. If you only use pasted text, OCR data is not needed.

## API endpoints

- `GET /api/health` or `GET /health`: service health, AI configuration indicator, and OCR language setting.
- `POST /api/analyze` or `POST /analyze`: multipart fields `text`, `language` (`en` or `hi`), and optional file field `image`.

## Deploy free: Render backend + Netlify frontend

This setup keeps the static website and Node.js API separate. The free services have usage limits and are suitable for a demo rather than production-critical use.

### A. Deploy the backend on Render

1. Sign in to Render and choose **New → Blueprint** (or create a **Web Service** manually).
2. Connect this GitHub repository: `Shivam-Sharma2009/formsathi_ai`.
3. If using Blueprint, use the repository's `render.yaml`. It points to `admin/`, uses `npm install` and `npm start`, and checks `/health`.
4. Choose the **Free** service plan and deploy.
5. Copy the Render service URL, for example `https://your-service.onrender.com`.

The Render Free service sleeps after 15 minutes without inbound traffic; the first request after sleep can take around a minute to wake it. Review Render's current free-instance limits before relying on it.

### B. Deploy the frontend on Netlify

1. Sign in to Netlify and choose **Add new site → Import an existing project**.
2. Connect GitHub and choose `Shivam-Sharma2009/formsathi_ai`.
3. Netlify reads `netlify.toml`; the published site is the static `user/` folder. There is no framework build step.
4. Deploy the site and copy its HTTPS URL, for example `https://your-site.netlify.app`.

The Netlify Free plan is $0 with a monthly credit limit. Check the current usage limits and the platform's eligibility terms for your location. Do not add a payment method or enable a paid plan just for this project.

### C. Connect the site to the API

These two values must match the actual URLs created by your accounts:

1. Edit `user/index.html` and set this meta tag's `content` to your Render service origin, with no trailing slash:

   ```html
   <meta name="formsaathi-api-base" content="https://YOUR-SERVICE.onrender.com">
   ```

2. In Render's service environment settings, set `CLIENT_ORIGIN` to your exact Netlify site origin, e.g. `https://YOUR-SITE.netlify.app`.
3. Save the Render environment change and redeploy if prompted.
4. Commit and push the `user/index.html` update. Netlify will redeploy automatically.
5. Open the Netlify URL and verify `https://YOUR-SERVICE.onrender.com/api/health` returns JSON with `status: "ok"`.
6. Test a non-sensitive sample notice in the website.

Keep `AI_API_KEY` only in Render's backend environment settings, mark it secret if the dashboard offers that choice, and never place it in HTML or JavaScript. Until an AI provider is configured, the site runs in clearly labelled demo mode.

Both services' free tiers have limits; Render's API can be slow after idle periods. Neither a GitHub repository nor a deployment configuration by itself means the website is live.

## Tests

The GitHub Actions workflow checks the static frontend files and JavaScript syntax, then runs backend syntax and API smoke tests. To run the backend checks locally:

```powershell
cd admin
npm install
node --check index.js
npm test
```

## Privacy and limitations

When real AI is configured, extracted notice text is sent to the selected inference provider. Review that provider's data policy before submitting sensitive material and avoid uploading unnecessary personal information. OCR can misread low-quality or handwritten notices. AI may omit or misinterpret details; confirm dates, fees, eligibility, and required documents directly against the official source.

## License

MIT. See [LICENSE](LICENSE).
