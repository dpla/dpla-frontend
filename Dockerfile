FROM node:22-slim AS builder

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ENV SITE_ENV="user"
ENV LOCAL_ID="aviation"
ENV WORDPRESS_URL="https://dpla.wpengine.com"
ENV USER_BASE_URL="https://dp.la"
ENV PRO_BASE_URL="https://pro.dp.la"

WORKDIR /opt/dpla-frontend/
COPY components ./components
COPY constants ./constants
COPY exhibitions-data ./exhibitions-data
COPY lib ./lib
COPY pages ./pages
COPY public ./public
COPY stylesheets ./stylesheets
COPY *.js ./
COPY package.json ./
COPY yarn.lock ./
COPY jsconfig.json ./
COPY .eslintrc.json ./
RUN yarn install --ignore-scripts && yarn run build

FROM node:22-slim AS dpla-frontend
RUN apt update && apt --no-install-recommends install -y tini curl && apt clean
WORKDIR /opt/dpla-frontend/
COPY components constants exhibitions-data lib pages public stylesheets *.js package.json yarn.lock /opt/dpla-frontend/
COPY --from=builder /opt/dpla-frontend/.next /opt/dpla-frontend/.next
COPY components ./components
COPY constants ./constants
COPY exhibitions-data ./exhibitions-data
COPY lib ./lib
COPY pages ./pages
COPY public ./public
COPY stylesheets ./stylesheets
COPY *.js ./
COPY package.json ./
COPY yarn.lock ./
COPY jsconfig.json ./
COPY .eslintrc.json ./
RUN yarn install --frozen-lockfile --prod
USER node

EXPOSE 3000
HEALTHCHECK CMD ["curl", "-f", "http://localhost:3000/healthcheck"]
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["yarn", "run", "start"]