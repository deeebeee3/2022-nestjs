import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  /* { each: true } means expected value is an array of strings */
  @IsString({ each: true })
  readonly flavours: string[];
}
