FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app
RUN yarn build

# Inject SITE_ENV
RUN echo "export const SITE_ENV = '$SITE_ENV';" >> ./constants/site.js

EXPOSE 3000
CMD [ "yarn", "start" ]