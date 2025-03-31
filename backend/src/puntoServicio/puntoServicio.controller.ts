import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuntoServicioService } from '../puntoServicio/puntoServicio.service';
import { CreatePuntoServicioDto } from './dto/create-punto-servicio.dto';
import { UpdatePuntoServicioDto } from './dto/update-punto-servicio.dto';

@Controller('puntoServicio')
export class PuntoServicioController {
  constructor(private readonly puntoServicioService: PuntoServicioService) {}

  @Post()
  create(@Body() createPuntoServicioDto: CreatePuntoServicioDto) {
    return this.puntoServicioService.create(createPuntoServicioDto);
  }

  @Get()
  findAll() {
    return this.puntoServicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puntoServicioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuntoServicioDto: UpdatePuntoServicioDto) {
    return this.puntoServicioService.update(+id, updatePuntoServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puntoServicioService.remove(+id);
  }
}
