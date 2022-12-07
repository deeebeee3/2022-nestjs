import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      /* can specify a path to / or a different name env file */
      /* envFilePath: '.environment', */
      /* can also choose to ignore env files like if deploying to a production env using heroku and setting the config variables via the UI */
      /* ignoreEnvFile: true, */
    }),
    CoffeesModule,
    /* configure connection to postgres using forRoot (we only use once here) func from TypeOrmModule */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      /* By default, every value that comes from process.env is a string, lets cast to a number by adding a plus infront of it */
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true /* great for development, but disable for production */,
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
