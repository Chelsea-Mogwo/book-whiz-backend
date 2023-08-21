FROM node:18

WORKDIR /book-wiz-backend

COPY package*.json ./

RUN npm install

VOLUME /book-wiz-backend

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]