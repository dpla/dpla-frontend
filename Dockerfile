# Dockerfile to build an image of the dpla-frontend application
#
# Expect that `yarn build` has already been run.


FROM node:fermium-bullseye-slim
RUN apt update && apt install -y tini
WORKDIR /opt/dpla-frontend
COPY . /opt/dpla-frontend
EXPOSE 3000
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["yarn", "run", "start"]
