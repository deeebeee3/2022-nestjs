import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    CoffeesModule,
  ] /* now we are able to use CoffeesService any where in our CoffeeRatingModule */,
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
