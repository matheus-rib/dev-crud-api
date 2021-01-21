FROM node:12-alpine

RUN apk add git bash curl \
  && apk --no-cache add --virtual build-deps build-base python