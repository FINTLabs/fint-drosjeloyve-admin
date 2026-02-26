FROM node:25-alpine AS build
COPY . /src
WORKDIR /src
RUN yarn && yarn build
