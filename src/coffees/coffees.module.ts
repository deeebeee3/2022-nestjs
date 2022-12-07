import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    /* ... do something ... */
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  /* register entity using forFeature func from TypeOrmModule */
  imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService, CoffeeBrandsFactory],
  exports: [
    /* now we are able to use CoffeesService any where in our CoffeeRatingModule */
    CoffeesService,
  ],
})
export class CoffeesModule {}
