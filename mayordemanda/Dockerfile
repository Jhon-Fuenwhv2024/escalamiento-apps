FROM node:18-alpine AS mayordemanda

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5172

CMD ["node", "index.js"]