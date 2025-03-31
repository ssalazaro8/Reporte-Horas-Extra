import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleados } from './empleados.entity';
import { CreateEmpleadoDto } from './dto/create-empleados.dto';
import { UpdateEmpleadoDto } from './dto/update-empleados.dto';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleados)
    private empleadosRepository: Repository<Empleados>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleados> {
    try {
      const empleado = this.empleadosRepository.create(createEmpleadoDto);
      return await this.empleadosRepository.save(empleado);
    } catch (error) {
      console.error('Error al crear empleado:', error);
      throw new InternalServerErrorException('Error al crear empleado');
    }
  }

  async findAll(): Promise<Empleados[]> {
    try {
      return await this.empleadosRepository.find();
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      throw new InternalServerErrorException('Error al obtener empleados');
    }
  }

  async findOne(NumeroDocumento: string): Promise<Empleados> {
    try {
      const empleado = await this.empleadosRepository
        .createQueryBuilder('Empleados')
        .where('Empleados.NumeroDocumento = :NumeroDocumento', { NumeroDocumento })
        .getOne();

      if (!empleado) {
        throw new NotFoundException(`Empleado con documento ${NumeroDocumento} no encontrado`);
      }
      return empleado;
    } catch (error) {
      console.error('Error al obtener empleado por número de documento:', error);
      throw new InternalServerErrorException('Error al obtener empleado por número de documento');
    }
  }

  async update(
    NumeroDocumento: string,
    updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleados> {
    try {
      const empleado = await this.findOne(NumeroDocumento);
      if (!empleado) {
        throw new NotFoundException(`Empleado con documento ${NumeroDocumento} no encontrado`);
      }

      Object.assign(empleado, updateEmpleadoDto);

      return await this.empleadosRepository.save(empleado);
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      throw new InternalServerErrorException('Error al actualizar empleado');
    }
  }

  async remove(NumeroDocumento: string): Promise<void> {
    try {
      const empleado = await this.findOne(NumeroDocumento);
      if (!empleado) {
        throw new NotFoundException(`Empleado con documento ${NumeroDocumento} no encontrado`);
      }
      await this.empleadosRepository.remove(empleado);
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      throw new InternalServerErrorException('Error al eliminar empleado');
    }
  }
}
