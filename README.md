# AI Form Assistant

A minimal, dark-themed Next.js application that leverages an AI endpoint to provide real-time suggestions and validation for form inputs.

## Features

- **App Router**: Built with the modern Next.js 15 App Router (`app/`).
- **Tailwind CSS v4**: Styled with Tailwind for a premium dark-theme interface.
- **AI Validation**: Instead of basic regex rules, the form inputs are sent to an LLM (`text.pollinations.ai`) which evaluates the data and returns friendly suggestions.
- **Responsive & Accessible**: Clean, centered card layout that works on all screen sizes.

## How it works

1. The user fills in their Name, Email, Password, and Bio.
2. When they click "Analyse with AI", the frontend state (`formData`) is sent via a POST request to `/api/analyse`.
3. The API route securely interacts with the text.pollinations.ai endpoint using a strict system prompt to request JSON output.
4. The JSON feedback is rendered gracefully under the corresponding input fields in the UI.

## Getting Started

First, ensure you have Node.js installed.

1. Navigate to the project directory:
   ```bash
   cd ai-form-assistant
   ```

2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Extending

To use Anthropic's Claude API or OpenAI's API instead of Pollinations, simply replace the `fetch` call in `app/api/analyse/route.ts` with the respective official SDKs and configure an API key in your `.env.local` file.
