FROM node:22-alpine AS base
WORKDIR /app

# builder stage
FROM base AS builder

COPY package*.json tsconfig*.json ./
RUN npm ci

COPY src ./src
RUN npm run build


# production stage
FROM base AS production
ENV NODE_ENV=production

COPY package.*json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]

# development stage
FROM base AS development

COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]




