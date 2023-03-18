# Node Alpine Docker Image
FROM node:18.9-alpine3.16

# Variables
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

# Install packages
RUN apk add bash openrc curl \
  && rm -rf /var/cache/apk/*

# Node setup
WORKDIR /app
COPY package.json .
RUN npm i --omit=dev --legacy-peer-deps
RUN npm i -g npm@latest
RUN npm cache clean --force
COPY . .

# Build
RUN npm run build

# Execute Script
COPY init.sh /bin/init.sh
RUN chmod 755 /bin/init.sh
ENTRYPOINT ["/bin/init.sh"]
