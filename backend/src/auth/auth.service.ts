// auth/auth.service.ts (con registro de usuarios)
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuarios } from 'src/usuarios/usuarios.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
    const user = await this.usuariosService.validateCredentials(email, password);
  
    const payload = { sub: user.ID_Usuario, role: user.ID_Rol };
    const token = await this.jwtService.signAsync(payload);
  
    return {
      access_token: token,
      user: {
        ID_Usuario: user.ID_Usuario,
        Email: user.Email,
        ID_Rol: user.ID_Rol,
      }
    };
  }
  
  async register(usuario: Partial<Usuarios>) {
    try {
      const hashedPassword = await bcrypt.hash(usuario.Contrasena, 10);
      usuario.Contrasena = hashedPassword;

      const nuevoUsuario = await this.usuariosService.create(usuario);
      return nuevoUsuario;
    } catch (error) {
      throw new UnauthorizedException('Error al registrar usuario');
    }
  }
}
