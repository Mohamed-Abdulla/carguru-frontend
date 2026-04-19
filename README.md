# CarGuru Frontend

An AI-powered car research assistant built with Next.js, Framer Motion, and ElevenLabs.

## 🚀 Setup & Installation

### 1. Prerequisites

- Node.js 20+
- npm or yarn
- ElevenLabs Agent ID (for voice features)

### 2. Environment Variables

Create a `.env` file in the root of the `carguru-frontend` directory:

```env
# Backend API URL (Base URL, do not include /api)
NEXT_PUBLIC_API_URL=http://localhost:3003

# ElevenLabs Configuration
NEXT_PUBLIC_ELEVEN_LABS_AGENT_ID=your_agent_id_here
```

### 3. Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### 4. Docker & Standalone Mode

This project is configured to build in **standalone** mode (see `next.config.ts`), which is ideal for Docker environments. The Dockerfile multi-stage build produces a minimal production image.

For deployment to **Vercel**, the standalone mode is automatically disabled via environment detection to ensure compatibility with Vercel's serverless infrastructure.

## 🛠 Features

- **Voice Assistant**: Integrated ElevenLabs Conversational AI for natural voice exploration.
- **Client-Side Fetching**: Stats and Popular sections use client-side fetching to ensure compatibility with Docker `localhost` resolution.
- **Language Support**: Seamlessly switch between English, Hindi, and Tamil.
- **Premium UI**: Framer Motion animations and glass-morphism design.
