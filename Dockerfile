# Node Alpine Docker Image
FROM node:18.9-alpine3.16

# Variables
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

# 2. Install packages
RUN apk add bash openrc curl \
  && rm -rf /var/cache/apk/*

# Node setup
WORKDIR /usr/src/app
COPY package.json .
RUN npm i --omit=dev --legacy-peer-deps --only=production
RUN npm i -g typescript
RUN npm cache clean --force
COPY . .

# Execute Script
ENTRYPOINT ["/bin/init.sh"]
