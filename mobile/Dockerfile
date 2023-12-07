FROM node:20.9.0-alpine3.17

RUN apk add --no-cache bash
SHELL ["/bin/bash", "-c"]

COPY ../front /app
WORKDIR /app

RUN npm install -g typescript@4.4.3

RUN npm install

ENTRYPOINT ["npm", "run", "start"]
