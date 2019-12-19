FROM node:10.16.0-stretch-slim AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build_prod

FROM nginx:1.16.0
RUN apt-get update && apt-get install -y nginx

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/hellodojofrontend .
COPY proxy1.conf /tmp/proxy.conf

RUN chmod -R -f a+w /etc/nginx && \
    chmod -R -f a+w /var/cache/nginx && \
    (chmod -R -f a+w /var/log/nginx || :) && \
    (chmod -R -f a+w /var/lib/nginx || :) && \
    (chmod -R -f a+w /run || :)

EXPOSE 8080 8443
CMD ["sh","-c","envsubst < /tmp/proxy.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

# docker build -t hellofrontend -f Dockerfile  .
# docker run -p 8080:8080 -d --name hellofrontend hellofrontend

# to inspect
# docker run -it -p 8080:8080  hellofrontend /bin/bash

