FROM node:16 as builder


WORKDIR /pfe/backend

COPY package*.json ./


RUN npm install

COPY . .



EXPOSE 4000

CMD [ "node", "app.js" ]


