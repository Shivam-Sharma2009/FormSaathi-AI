# FormSaathi AI 🇮🇳

**Big paperwork. Clear next steps.**

FormSaathi AI helps people understand public-service notices, scholarship circulars, and other important documents. Paste notice text or upload an image to extract readable text, identify important dates and document mentions, and organize practical next steps.

## 🌐 Live Demo

**Try it here:** https://formsaathi-ai-user.vercel.app/

The frontend and backend are deployed separately on Vercel.

## ✨ Features

- **Notice analysis:** Summaries, key points, deadlines, document mentions, eligibility clues, and a numbered action checklist.
- **Image OCR:** Tesseract.js extracts text from uploaded JPG, PNG, and WEBP images.
- **English/Hindi support:** Choose the language for the analysis.
- **Evidence-aware results:** Evidence snippets are checked against the supplied notice text.
- **Demo fallback:** If the inference provider is unavailable, the app returns clearly labelled rule-based demo results. These are not AI-generated.
- **Backend-held secrets:** Inference tokens must stay in backend environment variables, never in frontend code.

## 🛠️ Tech Stack

- HTML, CSS, JavaScript
- Node.js and Express.js
- Tesseract.js for OCR
- Open-weight language model through Hugging Face Inference Providers (when configured)
- Vercel for deployment
- GitHub for source control

## 🚀 How to Use

1. Open the [FormSaathi AI live demo](https://formsaathi-ai-user.vercel.app/).
2. Paste public-notice text or upload a supported image.
3. Run the analysis.
4. Review the summary, important dates, document mentions, and numbered next steps.
5. Verify all critical details against the original official notice before acting.

## ⚙️ Configure Open-Weight AI on Vercel

The backend already supports an OpenAI-compatible chat-completions endpoint, so you do not need to download a model or install a local inference runtime.

1. Create a Hugging Face account and generate a fine-grained token with **Make calls to Inference Providers** permission: https://huggingface.co/settings/tokens
2. Open the **backend** Vercel project (the project that serves `https://form-saathi-ai-blue.vercel.app`) and go to **Settings → Environment Variables**.
3. Set these variables for the deployment environment you use:

   | Variable | Value |
   | --- | --- |
   | `AI_BASE_URL` | `https://router.huggingface.co/v1` |
   | `AI_MODEL` | `openai/gpt-oss-20b:fastest` |
   | `AI_API_KEY` | Your Hugging Face access token |

4. Save the variables and redeploy the backend so the new configuration is loaded.
5. Test a real notice and confirm the response reports AI mode rather than Demo Mode. If it shows Demo Mode, inspect the backend Vercel runtime logs and verify the token, model availability, and provider quota.

**Important:** Hugging Face Inference Providers availability, supported models, and pricing can change. Free access is limited and should not be treated as unlimited. Check current pricing before using the app at scale: https://huggingface.co/docs/inference-providers/pricing. Do not enable paid usage unless you intentionally choose to pay.

## 💻 Run Locally

Requirements: Node.js and npm.

1. Clone the repository:

   ```bash
   git clone https://github.com/Shivam-Sharma2009/FormSaathi-AI.git
   cd FormSaathi-AI
   ```

2. Install backend dependencies:

   ```bash
   cd admin
   npm install
   ```

3. Configure `AI_BASE_URL`, `AI_MODEL`, and `AI_API_KEY` in your local backend environment using the values above, or choose another compatible provider/model. Never commit API keys or place them in frontend files.
4. Start the backend with the development script in `admin/package.json`.
5. Serve the static frontend from the `user` directory and point its API base to your local backend.

## 🔐 AI Status, Privacy, and Limitations

A configured provider/model determines what powers live AI analysis. Using an API alone does not prove that the selected model is open-weight; verify the model card and its license. If the provider is unavailable or the request fails, the application may return rule-based Demo Mode results instead. Do not describe those fallback results as AI-generated.

Notice text sent for analysis is processed by the configured inference provider. Avoid uploading unnecessary sensitive personal information and review the provider's data policy before use. OCR can misread text and AI can omit or misinterpret details.

FormSaathi AI is an independent informational tool, not an official government service or a source of final legal or eligibility decisions. Verify deadlines, eligibility, fees, and document requirements against the original notice or relevant authority.

## 🌱 Contributing

Suggestions, bug reports, and improvements are welcome. Please open an issue or pull request through GitHub.

## 📄 License

See the repository's [LICENSE](LICENSE) file.
