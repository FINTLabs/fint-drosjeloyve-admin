FROM node:26-alpine AS build

RUN npm install -g yarn

COPY . /src
WORKDIR /src
RUN yarn && yarn build
