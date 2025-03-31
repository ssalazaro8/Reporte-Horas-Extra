// centros.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentrosController } from './centros.controller';
import { CentrosService } from './centros.service';
import { Centro } from './centros.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Centro])],
    controllers: [CentrosController],
    providers: [CentrosService],
})
export class CentrosModule {}