FROM node:22-slim AS builder

ENV NODE_ENV production

ARG SITE_ENV
ARG LOCAL_ID
ARG WORDPRESS_URL
ARG USER_BASE_URL
ARG PRO_BASE_URL
ARG BASE_URL

USER node
WORKDIR /opt/dpla-frontend
COPY components constants exhibitions-data lib pages public stylesheets .babelrc .eslintrc .nvmrc *.js yarn.lock /opt/dpla-frontend/
RUN npm install yarn --ignore-scripts && yarn install --ignore-scripts && yarn build


FROM node:22-slim AS dpla-frontend
RUN apt update && apt --no-install-recommends install -y tini curl && apt clean
USER node
WORKDIR /opt/dpla-frontend
COPY package.json yarn.lock /opt/dpla-frontend/
RUN npm install yarn --ignore-scripts && yarn install --frozen-lockfile --prod
EXPOSE 3000
HEALTHCHECK CMD ["curl", "-f", "http://localhost:3000/healthcheck"]
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["yarn", "run", "start"]
