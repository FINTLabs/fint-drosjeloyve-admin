FROM node:26-alpine AS build
COPY . /src
WORKDIR /src
RUN yarn && yarn build
