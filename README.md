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

### Repository to access database

TypeORM support Repository design pattern

Each Entity we create has its own repository...

Since we created a Coffee Entity, we can now inject the automatically generated repository into our coffees service
using the InjectRepository decorator

### Side note on async functions:

Async functions always return a promise. If the return value of an async function is not explicitly a promise,
it will be implicitly wrapped in a promise. Example:

```js
return coffee;
return Promise.resolve(coffee);
```

Throwing exception in async func will automatically return a rejected promise:

```js
return Promise.reject(`Coffee #${id} not found`);
```

---

## TypeORM Relations

`nest g class coffees/entities/flavour.entity --no-spec`
(don't need test file for entities)

### ManyToMany Relation:

Notes:

```js
@JoinTable()
```

Specifies the OWNER side of the relationship

---

```js
  @ManyToMany((type) => Flavour, (flavour) => flavour.coffees)
```

First param just establishes what the TYPE for the relation is. Its just a function that returns a reference to the related entity.

Second param - returns the related entity and specifies
what property needs to be selected that is the inverse side of the relationship... In other words - what is coffee inside of the Flavour entity...

### IMPORTANT - A new table will be created: coffee_flavours_flavour which represents the ManyToMany relation between Coffee and Flavour entities

So in total we have three tables:

coffee
coffee_flavours_flavour
flavour

---

### Relations are not Eagerly loaded

Also remember relations are not eagerly loaded wheh making a request for data...

We need to specify the relation we want to include when getting data back like so:

```js
const coffee = await this.coffeeRepository.findOne({
  where: { id: id },
  relations: ['flavours'],
});
```

---

### Cascade

When creating a new coffee with a flavour/s, automatically insert the flavours into the flavour table:

```js
  @ManyToMany((type) => Flavour, (flavour) => flavour.coffees, {
    cascade: true,
  })
```

---

## Pagination

`nest generate class common/dto/pagination-query.dto --no-spec`

To test:

localhost:3000/coffees?limit=1 - should return just one result

localhost:3000/coffees?offset=1 - skips first coffee and we get back all the rest of the results from db

---

## Transactions

`nest generate class events/entities/event.entity --no-spec`

---

## Indexes

Indexes are special lookup tables, that our db search engine can use to speed up data retrieval.

Indexes help give our application rapid random lookups and efficient access of ordered records,
use them whenever performance is vitaly important for a certain entity.

---

## MIGRATIONS

typeorm config file (ormconfig.ts):

```ts
import { DataSource } from 'typeorm';

export const typeOrmConnectionDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'xxxx',
  password: 'xxxx',
  database: 'postgres',
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
});
```

The config setiings above are the same we used in our docker-compose file with a few additional values
used to let typeorm migrations know where our entities and migration files will be.

** TYPEORM MIGRATIONS NEED TO WORK ON COMPILED FILES, which nest will output in the dist folder **

Typeorm provides us with a dedicated CLI we can use.

### Create First migration (AUTOMATICALLY)

** npx lets us use executable packages without having to install them, this lets us use the typeorm CLI without
actually installing it on our machine. **

1. Edit the Entity (add new column or rename an existing column etc etc) and save file.

Example add a new description column in Coffee Entity:

```js
  @Column({ nullable: true })
  description: string;
```

2. Compile code using: `pnpm run build`
   TYPEORM MIGRATIONS NEED TO WORK ON COMPILED FILES, which nest will output in the dist folder.

3. Now let typeorm generate a migration for us:
   `typeorm migration:generate ./src/migrations/[name of migration depending on what your doing] -d ./dist/ormconfig.js`

   A migration .ts file will be added to ./src/migrations

   `-d` flag refers to datasource...

4. Compile code again so this time we have the migrations folder compiled to dist/src/migrations
   `pnpm run build`

5. Run the migration
   `npx typeorm migration:run -d ./dist/ormconfig.js`

6. To revert the migration do:
   `npx typeorm migration:revert -d ./dist/ormconfig.js`

# SECTION THREE 3

## Dependency Injection

Understand encapsulation...

Generate a module
`nest g mo coffee-rating`

Generate a service
`nest g s coffee-rating`

Lets say our new CoffeeRatingService depends on CoffeeService to fetch Coffee's from the db...

### Async Factory Pattern

Asynchronous Providers...

Sometimes when our application is bootstrapped, we need to delay the entire process until
one or more async tasks have completed. For example, we do not want to accept requests
until the connection with our database has been established.

We will see our CoffeeService class is instantiated AFTER COFFEE BRANDS are returned from the database.
Can check by looking at console logs.

```js
console.log('[!] Async factory');

//followed by

console.log(coffeeBrands); /* in the CoffeeService class constructor function */
```

---

### Dynamic Modules

`nest g mo database --no-spec`

Very important - sometimes we need to configure a module from a consuming module.

---

### Control Providers scope (how to control the scope of providers (classes))

DEFAULT BEHAVIOUR:

```js
@Injectable()
```

is really a shorthand implementation for

```js
@Injectable({ scope: Scope.DEFAULT})
```

Since generally by default all providers are Singletons (classes created once and cached for use when application is first bootstrapped)

As a best practice, using Singleton scope is recommended for most use cases... mainly for performance reasons.

---

### However, what other lifetimes are available for injectable providers...

Transient and Request scope lifetimes...

1. Transient providers are not shared across consumers, each consumer that injects a transient provider will receive a new dedicated instance
   of that provider.

   ```js
   @Injectable({ scope: Scope.TRANSIENT})
   ```

2. Request scope, provides a new instance of the provider exclusively for each incoming request.
   The instance is also automatically garbage collected after request has finished processing.

   ```js
   @Injectable({ scope: Scope.REQUEST})
   ```

   Request scope providers can inject their original request object - useful if you need headers, cookies, ip addresses etc...
   However, this may have an impact on app performance, since nest has to create a newinstance of the class for every request

   ```js
   @Inject(REQUEST) private readonly request: Request,
   ```

HOWEVER, always recommended to use the default Singleton Scope whenever possible.

---

# SECTION FOUR 4

## Application Configuration

`pnpm install @nestjs/config`

IMPORTANT - NORMALLY SHOULD NOT ADD .env file to gitcontrol...

Add `*.env` in `.gitignore` file

## Schema Validation

Install Joi:

`pnpm install joi`
`pnpm install --save-dev @types/joi`
