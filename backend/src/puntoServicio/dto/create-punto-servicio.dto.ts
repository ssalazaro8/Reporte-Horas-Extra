import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePuntoServicioDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  Codigo: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  Nombre: string;
}
