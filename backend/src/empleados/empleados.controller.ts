import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleados.dto';
import { UpdateEmpleadoDto } from './dto/update-empleados.dto';
import { Empleados } from './empleados.entity';

@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto): Promise<Empleados> {
    return await this.empleadosService.create(createEmpleadoDto);
  }

  @Get()
  async findAll(): Promise<Empleados[]> {
    return await this.empleadosService.findAll();
  }

  @Get(':numeroDocumento')
  async findOne(@Param('numeroDocumento') numeroDocumento: string): Promise<Empleados> {
    const empleado = await this.empleadosService.findOne(numeroDocumento);
    if (!empleado) {
      throw new NotFoundException(`Empleado con documento ${numeroDocumento} no encontrado`);
    }
    return empleado;
  }

  @Put(':numeroDocumento')
  async update(
    @Param('numeroDocumento') numeroDocumento: string,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleados> {
    return await this.empleadosService.update(numeroDocumento, updateEmpleadoDto);
  }

  @Delete(':numeroDocumento')
  async remove(@Param('numeroDocumento') numeroDocumento: string): Promise<{ message: string }> {
    await this.empleadosService.remove(numeroDocumento);
    return { message: `Empleado con documento ${numeroDocumento} eliminado correctamente` };
  }
}
