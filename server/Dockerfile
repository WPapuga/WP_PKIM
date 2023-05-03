FROM node:18-alpine

RUN apk update && apk add iputils

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY src ./src

EXPOSE 3080

CMD ["npm", "run", "dev"]
