// auth/auth.controller.ts (con registro de usuarios)
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { Email: string; Contrasena: string }) {
    try {
      const result = await this.authService.login(body.Email, body.Contrasena);
      if (!result) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      return result;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }  

  @Post('register')
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      return await this.authService.register(createUsuarioDto);
    } catch (error) {
      throw new UnauthorizedException('Error al registrar usuario');
    }
  }
}
