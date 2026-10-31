# FormSaathi AI 🇮🇳

<p align="center">
  <strong>Big paperwork. Clear next steps.</strong><br />
  Turn complex public-service notices into clear, evidence-backed action briefs.
</p>

<p align="center">
  <a href="https://formsaathi-ai-user.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-Open%20App-2f7d57?style=for-the-badge" alt="Live demo" /></a>
  <a href="https://github.com/Shivam-Sharma2009/FormSaathi-AI"><img src="https://img.shields.io/badge/GitHub-Source-181717?style=for-the-badge&logo=github" alt="GitHub repository" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-English%20%7C%20Hindi-356b54" alt="English and Hindi" />
  <img src="https://img.shields.io/badge/OCR-Tesseract.js-356b54" alt="Tesseract.js OCR" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-356b54" alt="Node.js and Express" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-111111?logo=vercel" alt="Vercel deployment" />
</p>

---

## What is FormSaathi AI?

Government notices, scholarship circulars, admission updates, and public-service documents often contain important information in dense language. Missing a deadline or document requirement can create unnecessary confusion.

**FormSaathi AI** helps make these notices easier to understand. Paste notice text or upload a document image to get a plain-language summary, key points, dates, document mentions, eligibility clues, and an ordered checklist of next steps.

The application supports **English and Hindi** and displays source evidence alongside extracted details so users can compare results with the original notice.

> FormSaathi AI is an independent informational tool. It is not an official government service and does not make final eligibility or legal decisions.

## Live application

| Component | Link |
| --- | --- |
| User application | [formsaathi-ai-user.vercel.app](https://formsaathi-ai-user.vercel.app/) |
| Backend API | [form-saathi-ai-blue.vercel.app](https://form-saathi-ai-blue.vercel.app/) |
| API health check | [Open health endpoint](https://form-saathi-ai-blue.vercel.app/api/health) |
| Source code | [GitHub repository](https://github.com/Shivam-Sharma2009/FormSaathi-AI) |

## Features

- **Notice summarization:** Converts long notice text into a plain-language explanation.
- **Key information extraction:** Organizes important points, dates, document mentions, and eligibility conditions.
- **English and Hindi:** Choose the language for the generated explanation.
- **Image OCR:** Extracts text from JPG, PNG, and WEBP images using Tesseract.js with English and Hindi language support.
- **Evidence-aware output:** Displays supporting excerpts and checks model-provided evidence against the submitted source text.
- **Action checklist:** Produces ordered, practical next steps based on the notice.
- **Demo mode:** Provides clearly labelled rule-based results when AI is not configured. Demo output is not represented as AI-generated.
- **Responsive interface:** Includes light and dark themes and works across common screen sizes.
- **Safer backend defaults:** Uses request-size limits, upload limits, rate limiting, security headers, CORS controls, and server-side AI credentials.

## How it works

1. **Add a notice:** Paste text or upload a readable image.
2. **Extract text:** Tesseract.js performs OCR for supported images.
3. **Analyze:** The backend sends the notice to the configured AI provider, when configured.
4. **Review:** The application organizes the response into a summary, key details, dates, document mentions, eligibility clues, and action steps.
5. **Verify:** Compare evidence excerpts and all important details with the original official notice.

## Screenshots

Add current screenshots of the live application here. Suggested captures:

- Main analyzer with a sample notice
- English analysis results
- Hindi analysis results
- Image upload and OCR flow

Example Markdown:

```md
![FormSaathi AI analyzer](screenshots/analyzer.png)
```

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| OCR | Tesseract.js |
| AI integration | Configurable Gemini or OpenAI-compatible chat-completions endpoint |
| Security and middleware | Helmet, CORS, express-rate-limit, Multer |
| Deployment | Vercel |
| Version control | Git and GitHub |

## Repository structure

```text
FormSaathi-AI/
├── admin/
│   ├── api/
│   ├── test/
│   ├── app.js
│   ├── index.js
│   ├── server.js
│   ├── package.json
│   └── vercel.json
├── user/
│   ├── app.js
│   ├── index.html
│   ├── styles.css
│   └── favicon.svg
├── .github/
├── firebase.json
├── .gitignore
├── LICENSE
└── README.md
```

## Run locally

### Prerequisites

- Node.js 20 or later
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Shivam-Sharma2009/FormSaathi-AI.git
cd FormSaathi-AI
```

### 2. Install backend dependencies

```bash
cd admin
npm install
```

### 3. Configure environment variables

Create an `.env` file inside the `admin/` directory:

```env
AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
AI_MODEL=YOUR_SUPPORTED_GEMINI_MODEL
AI_API_KEY=YOUR_API_KEY
OCR_LANGS=eng+hin
CLIENT_ORIGIN=http://localhost:5173
```

The AI settings are configurable. For a Gemini API endpoint, use the Gemini model name supported by your account. The backend also supports an OpenAI-compatible chat-completions endpoint when configured with the matching base URL, model, and API key.

**Never commit your `.env` file or expose API keys in frontend code.** Keep credentials in the backend environment only.

### 4. Start the backend

From the `admin/` directory:

```bash
npm run dev
```

The backend development server starts using the script in `admin/package.json`. The default local API port is configured in the server entry point.

### 5. Serve the frontend

Open a second terminal, then serve the `user/` directory with a local static web server. For example:

```bash
cd user
npx serve .
```

For local development, configure the frontend API base URL to point to your local backend if it is not using the default localhost configuration.

## Backend configuration

| Variable | Purpose |
| --- | --- |
| `AI_BASE_URL` | AI provider API base URL |
| `AI_MODEL` | Model identifier supported by the selected provider |
| `AI_API_KEY` | Provider API key; keep it server-side |
| `OCR_LANGS` | Tesseract OCR languages; defaults to `eng+hin` |
| `CLIENT_ORIGIN` | Optional comma-separated allowed frontend origins |

If AI credentials or model configuration are unavailable, the backend can return rule-based Demo Mode results. Check the `mode` field in the API response instead of assuming every result came from an AI model.

## Tests

The backend defines a Node.js test script:

```bash
cd admin
npm test
```

## Privacy, security, and limitations

- Uploaded images are handled in memory by the backend upload middleware; the application does not intentionally persist uploaded files as a permanent document store.
- When AI analysis is enabled, notice text is sent to the configured AI provider for processing. Review that provider's privacy and data-retention terms before submitting sensitive information.
- API credentials belong in backend environment variables, never in browser JavaScript or committed files.
- OCR can misread low-resolution, handwritten, skewed, or complex documents.
- AI-generated summaries can omit or misinterpret information. Evidence matching helps users verify excerpts, but it does not guarantee that the full analysis is correct.
- Demo Mode uses rule-based extraction and is not AI-generated.
- Always confirm deadlines, eligibility, fees, and required documents with the original notice or relevant official authority.

## Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-change`.
3. Make and test your changes.
4. Commit your work: `git commit -m "Describe your change"`.
5. Push the branch and open a pull request.

## License

This project is distributed under the license in the [LICENSE](LICENSE) file.

---

<p align="center">
  Built to make important information easier to understand. 🇮🇳
</p>
