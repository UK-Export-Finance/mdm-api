###################
# 1. BUILD
###################

# NPM 8.19.1 Alpine linux image
FROM node:18.9-alpine3.16 AS build

# Alpine Linux install packages
RUN apk add bash openrc curl \
  && rm -rf /var/cache/apk/*
RUN openrc
RUN mkdir -p /run/openrc/
RUN touch /run/openrc/softlevel

WORKDIR /app

# NPM
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm ci --legacy-peer-deps
RUN npm cache clean --force

# Copy application
COPY --chown=node:node . .

# Build with all dependencies
RUN npm run build
 
 # Lean NPM - Only install `dependencies`
 # `devDependencies` will still be resolved inside `package-lock.json`,
 # however they will not be installed inside `node_modules` directory.
 RUN npm ci --legacy-peer-deps --omit=dev


# Non-root user
USER node

###################
# 2. PRODUCTION
###################

# NPM 9.5.1 Alpine linux image
FROM node:19.8-alpine3.16 AS production

WORKDIR /app

# Copy from `build` to `prod`
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/package-lock.json .
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

# Non-root user
USER node

CMD ["npm", "run", "start:prod"]
