# ---- BUILD STAGE ----
FROM node:20-alpine AS builder
WORKDIR /app

# Enable standalone output if not already set in next.config.ts
ENV NEXT_OUTPUT_STANDALONE=true

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- RUNNER STAGE ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
# Next.js standalone output folders
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
