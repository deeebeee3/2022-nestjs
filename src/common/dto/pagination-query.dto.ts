//import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  /* make sure value coming in is parsed as a number - query params are sent through network as strings */
  //@Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  //@Type(() => Number)
  offset: number;
}

/* Note:

We no longer need to do the type conversion here as we have enabled implicit type conversion
in our validation pipe in main.ts

transformOptions: {
    enableImplicitConversion: true,
  },

*/
