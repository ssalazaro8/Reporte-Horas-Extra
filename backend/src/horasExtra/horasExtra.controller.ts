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
    @Query('puntoServicio') puntoServicio?: string,
    @Query('fechaDesde') fechaDesde?: string,
    @Query('fechaHasta') fechaHasta?: string
): Promise<HorasExtra[]> {
    try {
        return await this.horasExtraService.findFiltered(puntoServicio, fechaDesde, fechaHasta);
    } catch (error) {
        console.error('Error en el controlador:', error);
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error al obtener registros filtrados',
            message: error.message
        }, HttpStatus.INTERNAL_SERVER_ERROR);
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
          throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Error al actualizar el registro',
            error: error.message
          }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
      return await this.horasExtraService.remove(id);
  }
}
