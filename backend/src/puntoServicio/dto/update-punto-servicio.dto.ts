import { IsString, Length, IsOptional } from 'class-validator';

export class UpdatePuntoServicioDto {
  @IsOptional()
  @IsString()
  @Length(1, 20)
  Codigo?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  Nombre?: string;
}
