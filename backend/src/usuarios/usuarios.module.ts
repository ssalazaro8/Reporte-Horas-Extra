import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios.entity';
import { Roles } from '../roles/roles.entity'; // Relacionamos con el módulo de roles
import { Empleados } from 'src/empleados/empleados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios, Roles, Empleados])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // Exporta el servicio si otro módulo lo necesita
})
export class UsuariosModule {}
