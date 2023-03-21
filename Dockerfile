# NPM 9.5.1 Alpine linux image
FROM node:19.8-alpine3.16

# Variables
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA
ARG PORT
ENV PORT=$PORT

# Alpine Linux install packages
RUN apk add bash openrc curl \
  && rm -rf /var/cache/apk/*
RUN openrc
RUN mkdir -p /run/openrc/
RUN touch /run/openrc/softlevel

WORKDIR /app

# NPM
COPY --chown=node:node package*.json ./
RUN npm i -g npm@latest
RUN npm ci --omit=dev --legacy-peer-deps
RUN npm cache clean --force

# Copy application
COPY --chown=node:node . .

# Build
RUN npm run build

# Non-root user
USER node
CMD ["npm", "run", "start:prod"]

# Healthcheck for orchestrator
HEALTHCHECK CMD curl --fail http://localhost:${PORT} || exit 1