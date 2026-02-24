FROM node:24-alpine AS build
COPY . /src
WORKDIR /src
RUN yarn && yarn build
