FROM node:20.11.1

WORKDIR /usr/src/app
COPY package*.json ./
COPY src/ .
RUN npm install
COPY . .


EXPOSE 3000
CMD npm start