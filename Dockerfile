FROM node:alpine

WORKDIR /opt/Astraea/build

RUN apk update

COPY . .
RUN yarn
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

ENTRYPOINT ["node", "."]
