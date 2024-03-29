import { IsString } from "class-validator";

export class CreateCoffeeDto {

  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString({each: true})
  readonly hobbies: string[];
}
