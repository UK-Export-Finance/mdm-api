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
# start the NestJS application using docker-compose
$ docker compose up --build
```

```bash
# start the NestJS application using npm
$ npm run start:dev
```

### Test

```bash
# unit tests
$ npm run unit-test

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

### Authentication
The Master Data Management API requires an API Key in order to access its resources.
This can be achieved by providing a randomised API Key as an environment variable (`API_KEY`) and a strategy (`API_KEY_STRATEGY`) which defines the name of the header passed to the API

### Writing Conventional Commits

The most important prefixes you should have in mind are:

1. `fix:` which represents bug fixes, and correlates to a [SemVer](https://semver.org/) **patch**.
2. `feat:` which represents a new feature, and correlates to a [SemVer](https://semver.org/) **minor**.
3. `feat!:`, `fix!:` or `refactor!:`, etc., which represent a breaking change (indicated by the `!`) and will result in a [SemVer](https://semver.org/) **major**.


### Swagger
Custom URL (https://github.com/nestjs/swagger/pull/2273) for OpenAPI 3.0 JSON export has been added to swagger options to allow to API import in respective resources.