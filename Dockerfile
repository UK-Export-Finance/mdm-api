###################
# 1. BUILD
###################

FROM node:21.3.0-alpine3.17 AS build

# Alpine Linux install packages
RUN apk add bash curl
RUN rm -rf /var/cache/apk/*

WORKDIR /app

# NPM
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm ci --legacy-peer-deps

COPY --chown=node:node src src
COPY --chown=node:node nest-cli.json .
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node tsconfig.build.json .

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

FROM node:21.3.0-alpine3.17 AS production

WORKDIR /app

# Copy from `build` to `prod`
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/package-lock.json .
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

# Non-root user
USER node

CMD ["npm", "run", "start:prod"]
