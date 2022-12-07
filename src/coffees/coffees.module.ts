import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

//class MockCoffeesService {}

/* imagine this is abstract class, and depending on the dev env, 
the below two classes are different implementations of it */
// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

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
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    // { provide: CoffeesService, useValue: new MockCoffeesService() },
    // { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
    // { provide: COFFEE_BRANDS, useFactory: () => ['buddy brew', 'nescafe'] },
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
      /* inject takes in an array of providers, which get passed to the useFactory function and we can use them however we like */
      inject: [CoffeeBrandsFactory],
    },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
  ],
  exports: [
    CoffeesService,
  ] /* now we are able to use CoffeesService any where in our CoffeeRatingModule */,
})
export class CoffeesModule {}
