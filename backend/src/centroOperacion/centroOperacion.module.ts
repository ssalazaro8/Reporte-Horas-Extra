import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroOperacion } from './centroOperacion.entity';
import { CentroOperacionService } from './centroOperacion.service';
import { CentroOperacionController } from './centroOperacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CentroOperacion])],
  controllers: [CentroOperacionController],
  providers: [CentroOperacionService],
  exports: [CentroOperacionService],
})
export class CentroOperacionModule {}
