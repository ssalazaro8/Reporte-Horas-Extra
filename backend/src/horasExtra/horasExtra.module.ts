import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorasExtra } from '../horasExtra/horasExtra.entity';
import { HorasExtraService } from '../horasExtra/horasExtra.service';
import { HorasExtraController } from '../horasExtra/horasExtra.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HorasExtra])],
  controllers: [HorasExtraController],
  providers: [HorasExtraService],
})
export class HorasExtraModule {}