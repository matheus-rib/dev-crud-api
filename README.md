# Dev-CRUD API
API made with Typescript and PostgreSQL

Developing with [Docker](https://www.docker.com) (and Docker-Compose)

## Table of Contents
  - [Requirements](#requirements)
  - [Run the API](#run-the-api)
  - [Migrations](#migrations)
  - [Run commands](#run-commands)
  - [Tests](#tests)
  - [Docs](#docs)
    - [Rest API](#rest-api)
      - [Routes](#routes)
    - [Entities Schema](#entities-schema)
      - [Entities](#entities)
  - [Authors](#authors)

## Requirements
- Docker (and docker-compose)
- Insomnia (for API Routes docs)
- UMLet (for entities schema)
- NPM or Yarn

## Run the API
```bash
# Install dependencies
docker-compose run --rm api yarn
# or: docker-compose run --rm api npm install

# Start the api
docker-compose up
# Then open http://localhost:4000
```

## Migrations
- Run migrations
```bash
# API must be running
yarn docker:migration:run
# or: npm run yarn docker:migration:run
```

- Generate new migration
```bash
# API must be running
yarn docker:migration:generate MigrationName
# or: npm run docker:migration:generate MigrationName
```

## Run commands
```bash
docker-compose run --rm api ...
```

## Tests
To run all tests: 
```bash
yarn docker:test
# or: npm run docker:test
```

To run a specific test: 
```bash
yarn docker:test yarn test __tests__/folder_you_wanna_test/...
# or: npm run docker:test yarn test __tests__/folder_you_wanna_test/...
```

## Docs
### Rest API
- Install the [Insomnia Rest](https://insomnia.rest/)
- Open the insomnia
  - Then click in `import/export`,
  - Import from file
  - Select `./docs/insomnia.yaml`

#### Routes

### Entities Schema
- Install [UMLet](https://www.umlet.com)
- Open UMLet
  - Then click in `open`
  - Select `./docs/entity-schema.uxf`

#### Entities

## Authors
- Matheus Ribeiro