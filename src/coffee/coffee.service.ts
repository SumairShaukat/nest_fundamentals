import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';

@Injectable()
export class CoffeeService {
  private coffee: Coffee[] = [
    {
      id: 1,
      name: 'capocoin',
      brand: 'new Brand',
      flavours: ['first flavour', 'second flavour'],
    },
  ];

  findAll() {
    return this.coffee;
  }

  findById(id: number) {
    return this.coffee.find((item) => item.id === +id);
  }

  createCoffee(createCoffeedto: any) {
    return this.coffee.push(createCoffeedto);
  }
}
