# ---- BUILD STAGE ----
FROM node:20-alpine AS builder
WORKDIR /app

# Accept build arguments for Next.js environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ELEVEN_LABS_AGENT_ID
ARG NEXT_PUBLIC_TELEGRAM_API_URL

# Set them as environment variables for the build process
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_ELEVEN_LABS_AGENT_ID=$NEXT_PUBLIC_ELEVEN_LABS_AGENT_ID
ENV NEXT_PUBLIC_TELEGRAM_API_URL=$NEXT_PUBLIC_TELEGRAM_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- RUNNER STAGE ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
