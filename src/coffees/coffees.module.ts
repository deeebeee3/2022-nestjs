import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';

@Module({
  /* register entity using forFeature func from TypeOrmModule */
  imports: [TypeOrmModule.forFeature([Coffee, Flavour])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
