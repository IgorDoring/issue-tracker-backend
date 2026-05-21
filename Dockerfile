FROM node:22-alpine AS builder

WORKDIR /usr/src/issue-tracker-backend

COPY package.json .
COPY tsconfig.json .
COPY src ./src

RUN npm install
RUN npx tsc

FROM node:22-alpine

WORKDIR /usr/src/issue-tracker-backend

COPY --from=builder /usr/src/issue-tracker-backend/dist ./dist
COPY issues.json .
COPY package.json .

RUN npm install --omit=dev

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/server.js"]