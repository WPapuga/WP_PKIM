FROM node:18-alpine

RUN apk update && apk add iputils

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY src ./src

EXPOSE 3100

CMD ["npm", "run", "dev"]
