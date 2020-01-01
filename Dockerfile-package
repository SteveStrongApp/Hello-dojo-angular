FROM node:latest AS builder
ENV APP=/var/www

# Create app directory
RUN mkdir -p $APP
WORKDIR $APP

# Install app dependencies
COPY package*.json $APP/

RUN npm install

COPY . $APP
RUN npm run-script build-prod

FROM nginx:stable-alpine

ENV APP1=/var/www
WORKDIR /usr/share/nginx/html


# now there is a folder in dist
COPY --from=builder ${APP1}/dist/hellodojofrontend .

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]


# docker build -t hellofront -f Dockerfile  .
# docker run -p 8080:80 -d --name hellofront hellofront

# to inspect
# docker run -it -p 8080:80  hellofront /bin/bash

