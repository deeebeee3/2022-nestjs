<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# --------------------------------------------------------

# DEEPAKS NOTES

# --------------------------------------------------------

# SECTION ONE 1

## Setup

install nest cli

`nest new [project name]`

cd into [project name]

---

`pnpm run start`
`pnpm run start:dev`

---

## Controllers

Controllers handle requests in our application.

`nest generate controller [name]`
(will auto wire up with app module for us).

`nest generate controller modules/[name]`
(will generate in src/modules/[name]/)

can use `--dry-run` flag to see simulated output in console:

`nest generate controller modules/[name] --dry-run`

---

## Services

Services handle business logic in our application.

`nest generate service [name]`
(will auto wire up with app module for us).

`nest generate service modules/[name]`
(will generate in src/modules/[name]/)

can use `--dry-run` flag to see simulated output in console:

`nest generate service modules/[name] --dry-run`

---

\*\* A service is a provider

A provider means it can inject dependencies

\*\* A provider is just a class annotataed with a decorator called Injectable...

SERVICE:

```js
@Injectable()
export class CoffeesService {}
```

IT IS USED HERE IN THE CONTROLLER:

```js
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
}
```

Nest will resolve the coffeesService by creating and returning an instance of CoffeesService
to our CoffeesController.

Or in the case of a singleton - returning the existing instance if has already been
requested elsewhere.

---

## Modules

`nest generate module [name]`

---

## DTO (Data transfer objects)

`nest generate class coffees/dto/create-coffee.dto --no-spec`
`nest generate class coffees/dto/update-coffee.dto --no-spec`

We use `--no-spec` flag to not generate a test file for our dto...

look at the coffee entity to see what properties we will need for the dto.

---

## VALIDATION

First install the following:
`pnpm install class-validator class-transformer`

Then add validation pipe in place:

```js
app.useGlobalPipes(new ValidationPipe());
```

### Mapped Types

`pnpm install @nestjs/mapped-types`

Avoid repetition code smell by using PartialType:

```js
import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
```

In UpdateCoffeeDto all fields are optional.

### Whitelisting

```js
{
  whitelist: true,
  forbidNonWhitelisted: true,
}
```

Example request body (isEnabled does not exist on Dto)...

POST localhost:3000/coffees

```json
{
  "name": "Shipwreck Roast",
  "brand": "Buddy Brew",
  "flavours": ["caramel"],
  "isEnabled": true
}
```

Response back:

```json
{
  "statusCode": 400,
  "message": ["property isEnabled should not exist"],
  "error": "Bad Request"
}
```

---

# SECTION TWO 2

## Docker

Port mapping example:

```yml
ports:
  - '5432:5432'
```

Postgres will be running on its default port 5432 INSIDE the docker container
But we will also be able to access Postgress from OUTSIDE container on port 5432 aswell.

`docker-compose up -d` will spawn all services
`docker-compose up db -d` will spawn just the service named db

`-d` is detached mode - which means run containers in background

---

## TypeORM

Install below three packages;

`pnpm install @nestjs/typeorm typeorm pg`
