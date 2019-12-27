FROM node:latest AS builder
ENV APP=/var/www

#RUN apt-get update # && app-get install -y curl

# Create app directory
RUN mkdir -p $APP
WORKDIR $APP

# Install app dependencies
COPY package*.json $APP/

RUN npm install
#RUN npm rebuild node-sass

# Bundle app source in this experiment the dist should be build
# already  as well as all node modules
COPY . $APP
RUN npm run-script build-prod

FROM nginx:latest
RUN apt-get update && apt-get install -y nginx

ENV APP1=/var/www
WORKDIR /usr/share/nginx/htmldockerd


# now there is a folder in dist for angular 6
COPY --from=builder ${APP1}/dist/hellodojofrontend .
COPY proxy.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]



# docker build -t frontend -f Dockerfile  .
# docker run -p 8080:80 -d --name frontend frontend

# to inspect
# docker run -it -p 8080:80  frontend /bin/bash

