# syntax=docker/dockerfile:1.6

# ---- BUILD STAGE ----
FROM node:20-slim AS builder
WORKDIR /app

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Install deps (cached layer)
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy source
COPY . .

# Build args
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ELEVEN_LABS_AGENT_ID
ARG NEXT_PUBLIC_TELEGRAM_API_URL

# Set envs for build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_ELEVEN_LABS_AGENT_ID=$NEXT_PUBLIC_ELEVEN_LABS_AGENT_ID
ENV NEXT_PUBLIC_TELEGRAM_API_URL=$NEXT_PUBLIC_TELEGRAM_API_URL

# Build Next.js
RUN npm run build


# ---- RUNNER STAGE ----
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy only required output (small image)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]