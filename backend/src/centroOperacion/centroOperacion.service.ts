import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CentroOperacion } from './centroOperacion.entity';

@Injectable()
export class CentroOperacionService {
  constructor(
    @InjectRepository(CentroOperacion)
    private readonly centroOperacionRepository: Repository<CentroOperacion>,
  ) {}

  async findAll(p0: { select: string[]; }): Promise<Pick<CentroOperacion, 'Codigo' | 'Nombre'>[]> {
    return await this.centroOperacionRepository.find({
      select: ['Codigo', 'Nombre'],
    });
  }

  async findById(id: number): Promise<CentroOperacion> {
    const centroOperacion = await this.centroOperacionRepository.findOne({ where: { ID_CentroOperacion: id } });

    if (!centroOperacion) {
      throw new NotFoundException(`Centro de Operación con ID ${id} no encontrado`);
    }

    return centroOperacion;
  }

  async create(centroOperacion: CentroOperacion): Promise<CentroOperacion> {
    return await this.centroOperacionRepository.save(centroOperacion);
  }

  async update(id: number, data: Partial<CentroOperacion>): Promise<void> {
    const result = await this.centroOperacionRepository.update(id, data);
    if (result.affected === 0) {
      throw new NotFoundException(`No se pudo actualizar, ID ${id} no encontrado`);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.centroOperacionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No se pudo eliminar, ID ${id} no encontrado`);
    }
  }
}
