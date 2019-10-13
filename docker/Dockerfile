FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn && yarn add expo-cli --global

COPY . .

CMD ["yarn", "start"]
