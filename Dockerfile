# Node Alpine Docker Image
FROM node:18.9-alpine3.16

# Variables
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

# Alpine Linux install packages
RUN apk add bash openrc curl \
  && rm -rf /var/cache/apk/*

WORKDIR /app


# NPM
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps
RUN npm cache clean --force

# Copy application
COPY --chown=node:node . .

# Build
RUN npm run build

# Execute Script
COPY init.sh /bin/init.sh
RUN chmod 755 /bin/init.sh

# Non-root user
USER node
ENTRYPOINT ["/bin/init.sh"]
