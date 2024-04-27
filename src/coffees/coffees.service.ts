import { Injectable, NotFoundException, Options, Query } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Repository } from 'typeorm';
import { Coffee } from '../coffees/entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { pagiantionQueryDto } from 'src/common/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private  FlavorRepository: Repository<Flavor>,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavor = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preLoadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavor,
    });
    return this.coffeeRepository.save(coffee);
  }

  findAll(paginationQuery: pagiantionQueryDto) {
    const {offset, limit } = paginationQuery
    return this.coffeeRepository.find({
      relations: ['flavour'],
      skip: offset,
      take: limit
    });
  }

  async findOne(id: number) {
    const coffee = await this.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return coffee;
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preLoadFlavorByName(name: string): Promise<Flavor | null> {
    const existingFlavor = await this.FlavorRepository.findOneBy({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.FlavorRepository.create({ name });
  }
}
