FROM node:22-slim AS builder


ARG SITE_ENV="user"
ENV NEXT_PUBLIC_SITE_ENV=${SITE_ENV}
ARG LOCAL_ID="aviation"
ENV NEXT_PUBLIC_LOCAL_ID=${LOCAL_ID}
ENV NEXT_PUBLIC_WORDPRESS_URL="https://dpla.wpengine.com"
ENV NEXT_PUBLIC_USER_BASE_URL="https://dp.la"
ENV NEXT_PUBLIC_PRO_BASE_URL="https://pro.dp.la"
ARG GA_TRACKING_ID=""
ENV NEXT_PUBLIC_GA_TRACKING_ID=${GA_TRACKING_ID}
ENV API_KEY=""
ENV MAILCHIMP_KEY=""
ENV SENTRY_DSN=""
ENV SENTRY_ENVIRONMENT=""
ENV SENTRY_DEBUG=false
ENV MUST_FORK=true
ENV API_URL="https://api.dp.la/v2"
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

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
COPY --from=builder /opt/dpla-frontend/.next /opt/dpla-frontend/.next
RUN yarn install --ignore-scripts --frozen-lockfile --prod
USER node

EXPOSE 3000
HEALTHCHECK CMD ["curl", "-f", "http://localhost:3000/healthcheck"]
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["yarn", "run", "start"]