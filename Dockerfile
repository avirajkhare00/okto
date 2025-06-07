FROM node:24-alpine

WORKDIR /app

COPY server/package*.json .

RUN npm ci

COPY ./server .

RUN npm run build

RUN cd client && npm ci && npm run build

RUN mkdir -p public

COPY ./client/dist ./client/index.html ./client/src ./public

EXPOSE 8080

CMD ["node", "dist/index.js"]
