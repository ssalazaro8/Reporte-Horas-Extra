import { IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsString()
    Usuario: string;

    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @IsNotEmpty()
    @IsString()
    Contrasena: string;

    @IsNotEmpty()
    @IsNumber()
    ID_Rol: number;
}
