# CarGuru Frontend

An AI-powered car research assistant built with Next.js, Framer Motion, and ElevenLabs.

## 🚀 Setup & Installation

### 1. Prerequisites

- Node.js 20+
- npm or yarn
- ElevenLabs Agent ID (for voice features)

### 2. Environment Variables

Create a `.env` file in the root of the `frontend` directory:

```env
# Backend API URL (for production/docker use localhost or specific IP)
NEXT_PUBLIC_API_URL=http://localhost:3003/api

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

### 4. Docker Usage

You can run the frontend as part of the full stack from the root directory:

```bash
# In the root (carguru) project folder
docker compose up -d carguru_frontend
```

## 🛠 Features

- **Voice Assistant**: Integrated ElevenLabs Conversational AI for natural voice exploration.
- **Language Support**: Seamlessly switch between English, Hindi, and Tamil.
- **Premium UI**: Framer Motion animations and glass-morphism design.
- **Micro-Interactions**: Custom buttons and reactive components for a premium feel.
