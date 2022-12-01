import {
  // HttpException,
  // HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    /* Using nestjs built in exception layer this random error will be caught (500 Internal Server error) */
    /* throw 'A random error'; */

    const coffee = await this.coffeeRepository.findOne({ where: { id: id } });
    if (!coffee) {
      /* throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND); */
      throw new NotFoundException(`Coffee #${id} not found`);

      /* Note: throwing exception in async will automatically return a rejected promise:
      return Promise.reject(`Coffee #${id} not found`) */
    }

    /*  return Promise.resolve(coffee) */
    return coffee;

    /* Note: Async functions always return a promise. If the return value of an async function is not explicitly a promise, 
    it will be implicitly wrapped in a promise. Example: 
    return Promise.resolve(coffee) */
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    /* create a Coffee class instance based on our partial Dto and save to the variable coffee */
    const coffee = this.coffeeRepository.create(createCoffeeDto);

    /* call the save method (which returns a promise) and our new entity will be saved to the database */
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: id },
    });

    return this.coffeeRepository.remove(coffee);
  }
}
