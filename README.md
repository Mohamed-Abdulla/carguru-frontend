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
Open [http://localhost:3000](http://localhost:3000) to see the result.

### 4. Docker Usage
You can run the frontend as part of the full stack from the root directory:
```bash
# In the root (carguru) project folder
docker-compose up -d frontend
```

## 🛠 Features
- **Voice Assistant**: Integrated ElevenLabs Conversational AI for natural voice exploration.
- **Language Support**: Seamlessly switch between English, Hindi, and Tamil.
- **Premium UI**: Framer Motion animations and glass-morphism design.
- **Micro-Interactions**: Custom buttons and reactive components for a premium feel.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
