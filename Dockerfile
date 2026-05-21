FROM node:22-alpine

RUN mkdir -p /usr/src/issue-tracker-backend

COPY dist /usr/src/issue-tracker-backend/dist
COPY products.json /usr/src/issue-tracker-backend/
COPY package.json /usr/src/issue-tracker-backend/

WORKDIR /usr/src/issue-tracker-backend

RUN npm install --omit=dev

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "dist/server.js"]