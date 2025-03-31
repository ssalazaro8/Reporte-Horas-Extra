import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TipoHoraExtraService } from '../tipoHoraExtra/tipoHoraExtra.service';
import { TipoHoraExtra } from '../tipoHoraExtra/tipoHoraExtra.entity';

@Controller('tipoHE')
export class TipoHoraExtraController {
  constructor(private readonly tipoHoraExtraService: TipoHoraExtraService) {}

  @Post()
  async create(@Body() tipoHoraExtra: TipoHoraExtra): Promise<TipoHoraExtra> {
    return this.tipoHoraExtraService.create(tipoHoraExtra);
  }

  @Get()
  async findAll(): Promise<TipoHoraExtra[]> {
    return this.tipoHoraExtraService.findAll();
  }

  @Get(':nombre')
  async findByName(@Param('nombre') nombre: string): Promise<TipoHoraExtra> {
    return this.tipoHoraExtraService.findByName(nombre);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() tipoHoraExtra: TipoHoraExtra,
  ): Promise<TipoHoraExtra> {
    return this.tipoHoraExtraService.update(id, tipoHoraExtra);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.tipoHoraExtraService.remove(id);
  }
}
