FROM node:24-alpine

WORKDIR /app

COPY ./server/package*.json .

RUN npm ci

COPY ./server/dist .

RUN mkdir public

COPY ./client/dist/* ./client/index.html ./public

# Expose port and set command
EXPOSE 8080
CMD ["node", "index.js"]
