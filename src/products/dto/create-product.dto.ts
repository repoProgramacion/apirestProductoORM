import { IsEnum, IsInt, IsString, IsUrl, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  nombre!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  descripcion!: string;

  @IsInt()
  @Min(0)
  @Max(2147483647)
  cantidad!: number;

  @IsEnum(['activo', 'inactivo'])
  estado!: 'activo' | 'inactivo';

  @IsUrl()
  @MaxLength(2048)
  fotoUrl!: string;
}
