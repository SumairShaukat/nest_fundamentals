import { Controller, Get, Param, Patch, Body, Delete, Post, Query } from '@nestjs/common';
import { CoffeeService } from './coffee.service'
@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  getAll(@Query() paginateQuery) {
    const {limit, offset} = paginateQuery
    return `this is the getAll Controller ${limit} and ${offset}`;
  }


@Post()
create(@Body() body) {
  return `This is the create Controller`
}


@Get(':id')
 getOne(@Param('id') id: string ) {
  return `This is the getOne with id ${id}`;
 }

@Patch(':id')
update(@Param('id') id: string, @Body() body) {
  return `This is update wihh this id ${id}`
}

@Delete(':id')
remove(@Param('id') id: string) {
  return `This is Delete Controller with id ${id}`}
}

