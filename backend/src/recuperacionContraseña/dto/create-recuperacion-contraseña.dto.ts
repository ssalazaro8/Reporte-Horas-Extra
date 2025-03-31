import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecuperacionContrasenaDto {
  @IsNotEmpty()
  @IsNumber()
  ID_Usuario: number;

  @IsNotEmpty()
  @IsString()
  Token: string;
}
