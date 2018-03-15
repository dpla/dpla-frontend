# Dockerfile to build an image of the dpla-frontend application
#
# Expect that `yarn build` has already been run.


FROM node:carbon-alpine
WORKDIR /opt/dpla-frontend
COPY . /opt/dpla-frontend
EXPOSE 3000
CMD ["npm", "start"]
