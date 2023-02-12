# Description

[NestJS](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features

- [x] MSSQL TypeORM setup
- [x] Dockerised application using NodeJS v19
- [x] Conventional commits using Husky
- [x] Code formatting (using Prettier)
- [x] Code linting (using ESLint and Lint-staged)
- [x] Code spell checking (using `cspell`)
- [x] Renovate (update NPM packages automatically)
- [x] Standardized Editor config
- [x] Swagger based documentation
- [x] Config based on ENV variables
- [x] Automated API versioning `(/v1)`
- [x] Configuration for `Jest` tests
- [x] Automated releases based on conventional commits
- [x] Automated version bumps based on commit messages
- [x] Add logging using `Pino.js`
- [x] Alias paths
- [ ] CodeCov to analyse the test coverage
- [ ] Add rate-limiting
- [ ] Add Auth guards
- [ ] Configure Compodoc
- [ ] Add health checks
- [ ] Add hot reloading for local Docker development
- [ ] Add security headers
- [ ] Deployment pipelines

## Installation

```bash
npm install
```

### Running the service (dev)

```bash
# start the local SQL database
$ docker compose -f docker-compose.db.yml up --build
```

```bash
# using docker-compose
$ docker compose up --build
```

```bash
# without docker-compose
$ npm run start:dev
```

### Test

```bash
# unit tests
$ npm run test

# api tests
$ npm run api-test
```

### Generating new resources

To simplify the generation of new resources, you can use the boilerplate [CRUD](https://docs.nestjs.com/recipes/crud-generator)

```bash
nest g resource users
```

### Writing logs using PinoJS

```bash
# error
this.logger.error({ id: 'your message here' }, 'context-name');

# log
this.logger.log({ id: 'your message here' }, 'context-name');

```

### Writing Conventional Commits

The most important prefixes you should have in mind are:

1. `fix:` which represents bug fixes, and correlates to a [SemVer](https://semver.org/) **patch**.
2. `feat:` which represents a new feature, and correlates to a [SemVer](https://semver.org/) **minor**.
3. `feat!:`, `fix!:` or `refactor!:`, etc., which represent a breaking change (indicated by the `!`) and will result in a [SemVer](https://semver.org/) **major**.
