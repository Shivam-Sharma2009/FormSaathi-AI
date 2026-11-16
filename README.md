<div align="center">

# FormSaathi AI 🇮🇳

### Big paperwork. Clear next steps.

**Turn complex public-service notices into understandable summaries and practical action checklists.**

[![Live application](https://img.shields.io/badge/Live%20App-Open%20FormSaathi-167a61?style=for-the-badge)](https://formsaathi-ai-user.vercel.app/)
[![CI](https://img.shields.io/github/actions/workflow/status/Shivam-Sharma2009/FormSaathi-AI/ci.yml?branch=main&label=CI&logo=githubactions)](https://github.com/Shivam-Sharma2009/FormSaathi-AI/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-356b54.svg)](LICENSE)
[![English and Hindi](https://img.shields.io/badge/Languages-English%20%7C%20Hindi-356b54.svg)](#features)

</div>

---

## Overview

Government notices, scholarship circulars, admission updates, and public-service documents often contain important information in dense language. FormSaathi AI helps users understand that information and identify what they may need to do next.

Paste the notice text or upload a readable image. The application extracts and organizes key information into a plain-language summary, important points, dates, document mentions, eligibility clues, and an ordered action checklist. Results can include short evidence excerpts so users can compare them with the original notice.

FormSaathi AI supports **English and Hindi** and provides a clearly labelled **Demo Mode** when AI analysis is not available.

> **Disclaimer:** FormSaathi AI is an independent informational tool. It is not affiliated with any government department or authority. Its output is not an official decision, and users should verify important information against the original notice.

## Live deployment

| Service | URL |
| --- | --- |
| Frontend application | [formsaathi-ai-user.vercel.app](https://formsaathi-ai-user.vercel.app/) |
| Backend API | [form-saathi-ai-blue.vercel.app](https://form-saathi-ai-blue.vercel.app/) |
| API health endpoint | [api/health](https://form-saathi-ai-blue.vercel.app/api/health) |
| Source repository | [GitHub](https://github.com/Shivam-Sharma2009/FormSaathi-AI) |

## Features

- **Plain-language summaries:** Makes long or complicated notices easier to understand.
- **Key information extraction:** Organizes key points, dates, document mentions, and eligibility clues.
- **English and Hindi output:** Select the language for the analysis.
- **Image-to-text OCR:** Reads JPG, PNG, and WEBP images using Tesseract.js, with English and Hindi language support.
- **Evidence-aware results:** Shows supporting excerpts and validates model-provided evidence against the submitted notice text.
- **Action checklist:** Presents practical next steps based on the information found in the notice.
- **Demo Mode:** Uses rule-based extraction when AI is not configured or unavailable. Demo output is identified as non-AI output.
- **Responsive interface:** Supports desktop and mobile layouts, light and dark themes, and a live Indian Standard Time clock.
- **Loading experience:** Displays an animated skeleton while a notice is being analyzed, with reduced-motion support.
- **Convenience features:** Supports image selection, drag-and-drop, and clipboard image pasting.
- **Backend protections:** Applies request limits, upload size limits, rate limiting, security headers, and CORS origin checks.

## How it works

1. **Submit a notice:** Paste text or select, drop, or paste a supported image.
2. **Extract text:** The backend uses Tesseract.js to recognize text in uploaded images.
3. **Analyze content:** When configured, the backend sends the notice to the selected AI provider. Otherwise, it uses the rule-based Demo Mode.
4. **Review the action brief:** The frontend displays the summary, key points, dates, document mentions, eligibility clues, evidence, and checklist.
5. **Verify important details:** Compare the output with the original notice before acting on deadlines, eligibility, fees, or document requirements.

## Architecture

\`\`\`mermaid
flowchart TD
    A[User] --> B[Frontend - HTML, CSS and JavaScript]
    B -->|Text or image| C[Express API]
    C --> D{Image uploaded?}
    D -->|Yes| E[Tesseract.js OCR]
    D -->|No| F[Notice text]
    E --> G[Normalized notice text]
    F --> G
    G --> H{AI provider configured?}
    H -->|Yes| I[Configured AI provider]
    H -->|No or unavailable| J[Rule-based Demo Mode]
    I --> K[Structured analysis]
    J --> K
    K --> B
\`\`\`

The deployed application uses a separate frontend and backend on Vercel. The repository also includes a Firebase Cloud Functions v2 adapter as an alternative backend entry point.

## Technology stack

| Area | Technologies |
| --- | --- |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| OCR and uploads | Tesseract.js, Multer |
| AI integration | Gemini native \`:generateContent\` API format and OpenAI-compatible Chat Completions format |
| Middleware and security | CORS, Helmet, express-rate-limit |
| Configuration | dotenv, environment variables |
| Deployment | Vercel; optional Firebase Cloud Functions v2 adapter |
| Testing | Node.js built-in test runner, GitHub Actions |
| Interface | Google Fonts (DM Sans and Manrope), responsive layouts, light/dark themes |

## Repository structure

\`\`\`text
FormSaathi-AI/
├── .github/
│   └── workflows/
│       └── ci.yml
├── admin/
│   ├── api/
│   │   └── index.js          # Vercel serverless API entry point
│   ├── test/
│   │   └── api.test.js       # API smoke and regression tests
│   ├── app.js                # Express routes, OCR and analysis
│   ├── index.js              # Firebase Functions v2 adapter
│   ├── server.js             # Local development server
│   ├── package.json
│   └── vercel.json
├── user/
│   ├── app.js                # Frontend interactions and rendering
│   ├── index.html
│   ├── styles.css
│   └── favicon.svg
├── firebase.json
├── .gitignore
├── LICENSE
└── README.md
\`\`\`

## Run locally

### Prerequisites

- Node.js 20 or later
- npm
- Git

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/Shivam-Sharma2009/FormSaathi-AI.git
cd FormSaathi-AI
\`\`\`

### 2. Install backend dependencies

\`\`\`bash
cd admin
npm install
\`\`\`

### 3. Configure the backend

Create a file named \`.env\` inside the \`admin/\` directory:

\`\`\`env
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
OCR_LANGS=eng+hin

# Optional AI provider configuration.
# Leave these empty to use Demo Mode.
AI_BASE_URL=
AI_MODEL=
AI_API_KEY=
\`\`\`

AI configuration is optional. The backend supports the provider request formats listed in the technology stack. Configure credentials only on the backend, and use a provider whose terms permit your application's intended users and use case.

**Never commit real credentials.** Keep \`admin/.env\` private and use your hosting provider's environment-variable settings for deployments.

### 4. Start the backend

From the \`admin/\` directory:

\`\`\`bash
npm run dev
\`\`\`

The local API starts on port \`3001\` by default. You can check it at [http://localhost:3001/api/health](http://localhost:3001/api/health).

### 5. Start the frontend

Open a second terminal from the repository root:

\`\`\`bash
cd user
npx serve . -l 5173
\`\`\`

Open [http://localhost:5173](http://localhost:5173).

The frontend's API base URL is defined by the \`formsaathi-api-base\` meta tag in \`user/index.html\`. For local full-stack testing, change its value to:

\`\`\`html
<meta name="formsaathi-api-base" content="http://localhost:3001">
\`\`\`

Restore the deployed backend URL before publishing the frontend.

## Backend configuration

| Variable | Required | Description |
| --- | --- | --- |
| \`PORT\` | No | Local server port. Defaults to \`3001\`. |
| \`CLIENT_ORIGIN\` | No | Comma-separated list of allowed frontend origins. |
| \`OCR_LANGS\` | No | Tesseract language codes. Defaults to \`eng+hin\`. |
| \`AI_BASE_URL\` | No | Base URL for the selected AI provider. |
| \`AI_MODEL\` | No | Model identifier supported by that provider. |
| \`AI_API_KEY\` | Provider-dependent | Provider credential. Keep it on the backend only. |

When the AI provider is not configured or an AI request fails, the API falls back to rule-based Demo Mode and adds a caveat to the result. Check the response's \`mode\` field to distinguish \`ai\` from \`demo\`.

## API reference

### \`GET /api/health\`

Returns service health and configuration information.

Example response:

\`\`\`json
{
  "status": "ok",
  "service": "formsaathi-admin",
  "aiConfigured": false,
  "ocrLanguages": "eng+hin"
}
\`\`\`

### \`POST /api/analyze\`

Accepts \`multipart/form-data\`.

| Field | Type | Description |
| --- | --- | --- |
| \`text\` | String | Notice text. Maximum 30,000 characters. |
| \`language\` | String | \`en\` or \`hi\`. Defaults to English. |
| \`image\` | File | Optional JPG, PNG, or WEBP image. Maximum 5 MB. |

The response contains a structured analysis, including the mode, notice title, summary, key points, deadlines, required documents, eligibility clues, action checklist, caveats, and OCR text when an image was supplied.

### Main response fields

| Field | Purpose |
| --- | --- |
| \`mode\` | Indicates \`ai\` or \`demo\`. |
| \`noticeTitle\` | Detected or generated notice title. |
| \`summary\` | Plain-language overview. |
| \`keyPoints\` | Important statements with supporting evidence where available. |
| \`deadlines\` | Dates found in the notice and their context. |
| \`requiredDocuments\` | Document mentions found in the source. |
| \`eligibility\` | Eligibility-related conditions found in the source. |
| \`actionChecklist\` | Suggested next steps. |
| \`caveats\` | Limitations and details that need verification. |
| \`extractedText\` | OCR text, or \`null\` when no image was processed. |

## Tests and continuous integration

Run the backend tests locally:

\`\`\`bash
cd admin
npm test
\`\`\`

The GitHub Actions workflow runs on pushes and pull requests targeting \`main\`. It checks frontend files and JavaScript syntax, installs backend dependencies, checks backend syntax, and runs the API smoke tests.

[View CI workflow](https://github.com/Shivam-Sharma2009/FormSaathi-AI/actions/workflows/ci.yml)

## Security, privacy, and limitations

- The backend uses in-memory upload handling. Uploaded images are not intentionally written to a permanent application document store.
- When AI analysis is enabled, notice text is sent to the configured provider for processing. Review that provider's privacy, retention, and usage terms before submitting personal or sensitive information.
- API keys must remain in backend environment variables. Never put them in frontend JavaScript, HTML, or public repository files.
- The API applies upload limits, request rate limiting, security headers, and CORS origin checks. These controls reduce risk but do not guarantee complete security.
- OCR quality depends on image clarity, orientation, handwriting, and document layout. Review extracted text for mistakes.
- AI output can omit, misinterpret, or incorrectly summarize source content. Evidence matching is a verification aid, not a guarantee of correctness.
- Demo Mode uses heuristics rather than an AI model and may miss context or dates.
- Always confirm deadlines, eligibility, fees, and required documents with the original notice or the relevant official authority.

## Contributing

Contributions, bug reports, and improvement suggestions are welcome.

1. Fork the repository.
2. Create a feature branch: \`git checkout -b feature/your-change\`.
3. Make your changes and run the relevant tests.
4. Commit your changes: \`git commit -m "Describe your change"\`.
5. Push the branch and open a pull request.

## License

Distributed under the [MIT License](LICENSE).

---

<div align="center">

**Built to make important information easier to understand. 🇮🇳**

Made with ❤️ by **[Shivam Sharma](https://github.com/Shivam-Sharma2009)**

[Live application](https://formsaathi-ai-user.vercel.app/) · [Report an issue](https://github.com/Shivam-Sharma2009/FormSaathi-AI/issues) · [View source](https://github.com/Shivam-Sharma2009/FormSaathi-AI)

</div>
