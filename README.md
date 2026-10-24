# FormSaathi AI 🇮🇳

**Big paperwork. Clear next steps.**

FormSaathi AI is a web application that helps people understand complex public-service notices, scholarship circulars, and other important documents. Paste notice text or upload an image to extract readable text, identify important dates and document mentions, and organize practical next steps.

## 🌐 Live Demo

**Try it here:** https://formsaathi-ai-user.vercel.app/

The frontend is deployed on Vercel. The backend API is deployed separately on Vercel.

## ✨ Features

- **Notice text analysis:** Paste text from a public notice or circular.
- **Image OCR:** Upload a notice image and extract its text using Tesseract.js.
- **Key details:** Surface date mentions, required-document references, eligibility clues, and suggested next steps.
- **English/Hindi support:** Language options are available in the interface.
- **Evidence-aware results:** The app can show source-related evidence to help users verify extracted details.
- **Demo fallback:** If the AI provider is unavailable or not configured, the app can return rule-based demo results. Demo results are not AI-generated.
- **Backend-held API keys:** Provider secrets should stay in backend environment variables, never in frontend code.

## 🛠️ Tech Stack

- HTML, CSS, JavaScript
- Node.js and Express.js
- Tesseract.js for OCR
- Gemini API integration for AI analysis
- Vercel for deployment
- GitHub for source control

## 🚀 How to Use

1. Open the [FormSaathi AI live demo](https://formsaathi-ai-user.vercel.app/).
2. Paste notice text or upload a supported image.
3. Run the analysis.
4. Review the summary, important dates, document mentions, and suggested actions.
5. Verify all critical details against the original official notice before acting.

## 💻 Run Locally

Requirements: Node.js and npm.

1. Clone this repository:

   ```bash
   git clone https://github.com/Shivam-Sharma2009/FormSaathi-AI.git
   cd FormSaathi-AI
   ```

2. Install backend dependencies:

   ```bash
   cd admin
   npm install
   ```

3. Configure the backend environment using the example file if present. Add your own Gemini API key as a backend environment variable. **Never commit API keys or put them in frontend files.**

4. Start the backend using the development command configured in `admin/package.json`.

5. Serve the static frontend from the `user` directory using VS Code Live Server or a local static HTTP server, and ensure the frontend API base points to your local backend.

Check the repository's `admin/package.json` and environment example for the exact scripts and variable names used by the current version.

## 🔐 API Key and AI Status

FormSaathi AI integrates with the Gemini API. Gemini API access does **not** automatically mean that the app uses Gemma, Gemma 4, or another open-weight model. The exact configured model and provider availability determine what powers live AI analysis.

If the provider is unavailable, the application may show **Demo Mode** and return rule-based results instead. Do not treat demo output as a live AI response. Availability, quotas, and supported models can vary; verify the configured model in the backend environment and test a real analysis before describing the project as powered by a specific model.

## ⚠️ Disclaimer

FormSaathi AI is an independent informational tool, not an official government service or a source of legal or eligibility decisions. OCR can misread text, and AI output may omit or misinterpret details. Always verify deadlines, eligibility criteria, fees, and document requirements against the original notice or the relevant authority.

Avoid uploading unnecessary sensitive personal information. When live AI analysis is enabled, notice text may be sent to the configured inference provider; review that provider's data policy before use.

## 🌱 Contributing

Suggestions, bug reports, and improvements are welcome. Please open an issue or pull request through GitHub.

## 📄 License

See the repository's [LICENSE](LICENSE) file.
