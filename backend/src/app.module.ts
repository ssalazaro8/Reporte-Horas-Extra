import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { PuntoServicioModule } from './puntoServicio/puntoServicio.module';
import { CentroCostoModule } from './centroCosto/centroCosto.module';
import { CentroOperacionModule } from './centroOperacion/centroOperacion.module';
import { TipoHoraExtraModule } from './tipoHoraExtra/tipoHoraExtra.module';
import { HorasExtraModule } from './horasExtra/horasExtra.module';
import { CentrosModule } from './centros/centros.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, RolesModule, UsuariosModule, EmpleadosModule, 
    PuntoServicioModule, CentroCostoModule, CentroOperacionModule, TipoHoraExtraModule, HorasExtraModule,
    CentrosModule, AuthModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
