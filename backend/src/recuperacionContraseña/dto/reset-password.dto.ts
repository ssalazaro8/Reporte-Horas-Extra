import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 20) // Ejemplo: la contraseña debe tener entre 6 y 20 caracteres
  password: string;
}
