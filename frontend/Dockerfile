FROM node:16-alpine

WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn
RUN yarn add react-scripts@3.4.1 -g

# add app
COPY . ./

# start app
CMD ["npm", "start"]