FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install --silent \
        && npm install typescript -g --silent
ADD . /app/
RUN npm run build
COPY .env ./build
CMD [ "npm", "start" ]