import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CentroCostoService } from './centroCosto.service';
import { CentroCosto } from './centroCosto.entity';

@Controller('centroCosto')
export class CentroCostoController {
  constructor(private readonly centroCostoService: CentroCostoService) {}

  @Get()
  async findAll(): Promise<Pick<CentroCosto, 'Codigo' | 'Nombre'>[]> {
    return this.centroCostoService.findAll();
  }
  

  @Get(':id')
  async getById(@Param('id') id: number): Promise<CentroCosto> {
    return this.centroCostoService.findById(id);
  }

  @Post()
  async create(@Body() centroCosto: CentroCosto): Promise<CentroCosto> {
    return this.centroCostoService.create(centroCosto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<CentroCosto>): Promise<void> {
    return this.centroCostoService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.centroCostoService.delete(id);
  }
}
