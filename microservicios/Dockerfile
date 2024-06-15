FROM node:18-alpine AS microservicios

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["node", "index.js"]