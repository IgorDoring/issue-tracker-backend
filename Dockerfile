FROM node:20 AS builder
WORKDIR /usr/src/sportsstore
COPY package.json tsconfig.json ./
COPY src ./src
RUN npm install && npx tsc

FROM node:20-alpine
WORKDIR /usr/src/sportsstore
COPY --from=builder /usr/src/sportsstore/dist ./dist
COPY templates ./templates
COPY products.json server.config.json production.server.config.json package.json ./
RUN npm install --omit=dev
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/server.js"]