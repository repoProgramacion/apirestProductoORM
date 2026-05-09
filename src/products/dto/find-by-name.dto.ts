import { IsString, MinLength } from 'class-validator';

export class FindByNameDto {
  @IsString()
  @MinLength(1)
  nombre!: string;
}
