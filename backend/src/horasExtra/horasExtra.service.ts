import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HorasExtra } from './horasExtra.entity';
import { CreateHorasExtraDto } from './dto/createHorasExtras.dto';

@Injectable()
export class HorasExtraService {
  constructor(
      @InjectRepository(HorasExtra)
      private readonly horasExtraRepository: Repository<HorasExtra>,
  ) {}

  async create(horasExtra: CreateHorasExtraDto): Promise<HorasExtra> {
      const newHorasExtra = this.horasExtraRepository.create(horasExtra);
      return await this.horasExtraRepository.save(newHorasExtra);
  }

  async createBulk(horasExtras: CreateHorasExtraDto[]): Promise<HorasExtra[]> {
      const entities = this.horasExtraRepository.create(horasExtras);
      return await this.horasExtraRepository.save(entities);
  }

  async findFiltered(puntoServicio: string, fechaDesde?: string, fechaHasta?: string): Promise<HorasExtra[]> {
    const query = this.horasExtraRepository.createQueryBuilder('horasExtra')
        .select('horasExtra') // Esto selecciona todos los campos de HorasExtra
        .where('horasExtra.PuntoServicio = :puntoServicio', { puntoServicio });

    if (fechaDesde) {
        query.andWhere('horasExtra.FechaHoExt >= :fechaDesde', { fechaDesde });
    }

    if (fechaHasta) {
        query.andWhere('horasExtra.FechaHoExt <= :fechaHasta', { fechaHasta });
    }

    return await query.getMany();
}

  async findAll(): Promise<HorasExtra[]> {
      return await this.horasExtraRepository.find();
  }

  async findOne(id: number): Promise<HorasExtra> {
      return await this.horasExtraRepository.findOne({ where: { ID_HoraExtra: id } });
  }

  async update(id: number, data: Partial<HorasExtra>): Promise<any> {
    try {
        const horaExtra = await this.horasExtraRepository.findOne({ where: { ID_HoraExtra: id } });
        if (!horaExtra) {
            throw new NotFoundException(`Registro con ID ${id} no encontrado`);
        }
        
        Object.assign(horaExtra, data);
        await this.horasExtraRepository.save(horaExtra);
        
        return { success: true, message: `Hora extra con ID ${id} actualizada correctamente.` };
    } catch (error) {
        throw new Error(`Error al actualizar el registro: ${error.message}`);
    }
}


  async remove(id: number): Promise<any> {
      const result = await this.horasExtraRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Registro con ID ${id} no encontrado`);
      }
      return { success: true, message: `Hora extra con ID ${id} eliminada correctamente.` };
  }
}
