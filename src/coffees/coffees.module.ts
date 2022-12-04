import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

class MockCoffeesService {}

@Module({
  /* register entity using forFeature func from TypeOrmModule */
  imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    { provide: CoffeesService, useValue: new MockCoffeesService() },
    { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
  ],
  exports: [
    CoffeesService,
  ] /* now we are able to use CoffeesService any where in our CoffeeRatingModule */,
})
export class CoffeesModule {}
