### Description

[NestJS](https://github.com/nestjs/nest) framework TypeScript starter repository.

#### Features

- [x] MSSQL TypeORM setup
- [x] Dockerised application using NodeJS v19
- [x] Redis cache
- [x] Conventional commits using Husky
- [x] Code formatting (using Prettier)
- [x] Code linting (using ESLint)
- [x] Renovate (update NPM packages automatically)
- [x] Standardized Editor config
- [x] Swagger based documentation
- [x] Config based on ENV variables
- [x] Automated API versioning (/v1)
- [ ] Automated releases based on conventional commits
- [ ] Automated version bumps based on commit messages
- [ ] Configuration for Jest tests
- [ ] Alias paths
- [ ] CodeCov to analyse the test coverage
- [ ] Add rate-limiting
- [ ] Add logging using Pino.js
- [ ] Add Auth guards
- [ ] Configure Compodoc
- [ ] Add health checks
- [ ] Add hot reloading for local Docker development
- [ ] Add security headers
- [ ] Deployment pipelines

### Installation

```bash
$ npm install
```

### Running the service (dev)

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
$ nest g resource users
```

### Writing Conventional Commits

The most important prefixes you should have in mind are:

1. `fix:` which represents bug fixes, and correlates to a [SemVer](https://semver.org/) **patch**.
2. `feat:` which represents a new feature, and correlates to a [SemVer](https://semver.org/) **minor**.
3. `feat!:`, `fix!:` or `refactor!:`, etc., which represent a breaking change (indicated by the `!`) and will result in a [SemVer](https://semver.org/) **major**.
