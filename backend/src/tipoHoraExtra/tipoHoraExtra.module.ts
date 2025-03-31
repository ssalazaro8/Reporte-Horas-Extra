import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoHoraExtra } from '../tipoHoraExtra/tipoHoraExtra.entity';
import { TipoHoraExtraService } from '../tipoHoraExtra/tipoHoraExtra.service';
import { TipoHoraExtraController } from './tipoHoraExtra.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoHoraExtra])],
  controllers: [TipoHoraExtraController],
  providers: [TipoHoraExtraService],
  exports: [TipoHoraExtraService],
})
export class TipoHoraExtraModule {}
