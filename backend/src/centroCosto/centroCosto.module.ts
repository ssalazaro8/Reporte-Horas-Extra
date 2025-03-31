import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroCosto } from './centroCosto.entity';
import { CentroCostoService } from './centroCosto.service';
import { CentroCostoController } from './centroCosto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CentroCosto])],
  controllers: [CentroCostoController],
  providers: [CentroCostoService],
  exports: [CentroCostoService], // Si otros módulos lo necesitan
})
export class CentroCostoModule {}
