import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    /* now we are able to use CoffeesService any where in our CoffeeRatingModule */
    CoffeesModule,
    /* here we are importing our DYNAMIC module and passing options to it */
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
    }),
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
