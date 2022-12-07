import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [
    CoffeesModule,
    /* configure connection to postgres using forRoot (we only use once here) func from TypeOrmModule */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres' /* same as in docker-compose file */,
      password: 'pass123' /* same as in docker-compose file */,
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true /* great for development, but disable for production */,
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
