FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn

COPY . /usr/src/app

# Inject SITE_ENV
RUN echo "export const SITE_ENV = '${SITE_ENV}';" >> ./constants/site.js

# Bundle app source
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]