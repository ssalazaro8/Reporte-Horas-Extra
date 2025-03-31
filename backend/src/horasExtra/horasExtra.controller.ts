import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { HorasExtraService } from './horasExtra.service';
import { CreateHorasExtraDto } from './dto/createHorasExtras.dto';
import { HorasExtra } from './horasExtra.entity';

@Controller('horas-extra')
export class HorasExtraController {
  constructor(private readonly horasExtraService: HorasExtraService) {}

  @Post()
  async create(@Body() createHorasDto: CreateHorasExtraDto): Promise<HorasExtra> {
      return await this.horasExtraService.create(createHorasDto);
  }

  @Post('bulk')
  async createBulk(@Body() horasExtras: CreateHorasExtraDto[]): Promise<HorasExtra[]> {
      return await this.horasExtraService.createBulk(horasExtras);
  }

  @Get()
  async findFiltered(
      @Query('puntoServicio') puntoServicio: string,
      @Query('fechaDesde') fechaDesde?: string,
      @Query('fechaHasta') fechaHasta?: string
  ): Promise<HorasExtra[]> {
      if (puntoServicio === '') {
          return await this.horasExtraService.findAll();
      } else {
          return await this.horasExtraService.findFiltered(puntoServicio, fechaDesde, fechaHasta);
      }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<HorasExtra> {
      return await this.horasExtraService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<HorasExtra>): Promise<any> {
      try {
          const result = await this.horasExtraService.update(id, data);
          return result;
      } catch (error) {
          throw new HttpException('Error al actualizar el registro', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
      return await this.horasExtraService.remove(id);
  }
}
