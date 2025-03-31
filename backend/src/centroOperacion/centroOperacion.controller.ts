import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CentroOperacionService } from './centroOperacion.service';
import { CentroOperacion } from './centroOperacion.entity';

@Controller('centroOperacion')
export class CentroOperacionController {
  constructor(private readonly centroOperacionService: CentroOperacionService) {}

  @Get()
  async findAll(): Promise<Pick<CentroOperacion, 'Codigo' | 'Nombre'>[]> {
    return this.centroOperacionService.findAll({ select: ['Codigo', 'Nombre'] });
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CentroOperacion> {
    return this.centroOperacionService.findById(id);
  }

  @Post()
  async create(@Body() centroOperacion: CentroOperacion): Promise<CentroOperacion> {
    return this.centroOperacionService.create(centroOperacion);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CentroOperacion>
  ): Promise<void> {
    return this.centroOperacionService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.centroOperacionService.delete(id);
  }
}
