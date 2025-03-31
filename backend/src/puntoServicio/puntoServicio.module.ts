import { Module } from '@nestjs/common';
import { PuntoServicioService } from '../puntoServicio/puntoServicio.service';
import { PuntoServicioController } from './puntoServicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuntoServicio } from './puntoServicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PuntoServicio])],
  controllers: [PuntoServicioController],
  providers: [PuntoServicioService],
  exports: [PuntoServicioService], // Opcional: si necesitas usar el servicio en otros módulos
})
export class PuntoServicioModule {}
