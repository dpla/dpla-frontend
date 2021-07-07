# Dockerfile to build an image of the dpla-frontend application
#
# Expect that `yarn build` has already been run.


FROM node:14
WORKDIR /opt/dpla-frontend
COPY . /opt/dpla-frontend
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
