# Dockerfile to build an image of the dpla-frontend application
#
# Expect that `yarn build` has already been run.


FROM node:22-slim
RUN apt update && apt --no-install-recommends install -y tini curl && apt clean
WORKDIR /opt/dpla-frontend
COPY . /opt/dpla-frontend
RUN chown -R node:node /opt/dpla-frontend
USER node
EXPOSE 3000
HEALTHCHECK CMD ["curl", "-f", "http://localhost:3000/healthcheck"]
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["yarn", "run", "start"]
