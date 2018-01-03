FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install --global yarn
COPY package.json yarn.lock /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]