import {
  // HttpException,
  // HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,

    @InjectRepository(Flavour)
    private readonly flavourRepository: Repository<Flavour>,

    private readonly datasource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavours'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    /* Using nestjs built in exception layer this random error will be caught (500 Internal Server error) */
    /* throw 'A random error'; */

    const coffee = await this.coffeeRepository.findOne({
      where: { id: id },
      relations: ['flavours'],
    });

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

  async create(createCoffeeDto: CreateCoffeeDto) {
    /* save the flavours in the flavours table first */
    const flavours = await Promise.all(
      createCoffeeDto.flavours.map((name) => this.preloadFlavourByName(name)),
    );

    /* create a Coffee class instance based on our partial Dto and save to the variable coffee */
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavours,
    });

    /* call the save method (which returns a promise) and our new entity will be saved to the database */
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    /* if flavours passed in update request save the flavours in the flavours table first */
    const flavours =
      updateCoffeeDto.flavours &&
      (await Promise.all(
        updateCoffeeDto.flavours.map((name) => this.preloadFlavourByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavours,
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
    /* dont need to throw any errors manually if coffee does not exist
    as findOne method automatically handle that for us  */

    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavourByName(name: string): Promise<Flavour> {
    const existingFlavour = await this.flavourRepository.findOne({
      where: { name: name },
    });

    if (existingFlavour) {
      return existingFlavour;
    }

    return this.flavourRepository.create({ name });
  }
}
