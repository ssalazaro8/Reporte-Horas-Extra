// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsuariosService } from '../usuarios/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from '../usuarios/usuarios.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]), // Importa el UsuariosRepository
    JwtModule.register({
      secret: process.env.SECRET_KEY, 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [UsuariosService, AuthService],
})
export class AuthModule {}
