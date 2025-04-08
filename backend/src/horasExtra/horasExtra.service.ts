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

  async findFiltered(puntoServicio?: string, fechaDesde?: string, fechaHasta?: string): Promise<HorasExtra[]> {
    const query = this.horasExtraRepository.createQueryBuilder('h');
    
    // Filtro por punto de servicio
    if (puntoServicio) {
        query.andWhere('h.PuntoServicio = :puntoServicio', { puntoServicio });
    }
    
    // Filtro por rango de fechas
    if (fechaDesde && fechaHasta) {
        query.andWhere('h.FechaHoExt BETWEEN :fechaDesde AND :fechaHasta', {
            fechaDesde: new Date(fechaDesde),
            fechaHasta: new Date(fechaHasta)
        });
    } else if (fechaDesde) {
        query.andWhere('h.FechaHoExt >= :fechaDesde', { fechaDesde: new Date(fechaDesde) });
    } else if (fechaHasta) {
        query.andWhere('h.FechaHoExt <= :fechaHasta', { fechaHasta: new Date(fechaHasta) });
    }
    
    try {
        const result = await query.getMany();
        console.log('Registros encontrados:', result.length);
        return result;
    } catch (error) {
        console.error('Error en findFiltered:', error);
        throw new Error('Error al filtrar registros');
    }
}

  async findAll(): Promise<HorasExtra[]> {
      return await this.horasExtraRepository.find();
  }

  async findOne(id: number): Promise<HorasExtra> {
    try {
        return await this.horasExtraRepository
            .createQueryBuilder('h')
            .where('h.ID_HoraExtra = :id', { id })
            .getOne();
    } catch (error) {
        console.error('Error en findOne:', error);
        throw new Error('Error al encontrar el registro');
    }
}
  
async update(id: number, data: Partial<HorasExtra>): Promise<any> {
    try {
        // Convertir fecha a formato compatible si existe
        if (data.FechaHoExt) {
            data.FechaHoExt = new Date(data.FechaHoExt);
        }

        const result = await this.horasExtraRepository
            .createQueryBuilder()
            .update(HorasExtra)
            .set(data)
            .where("ID_HoraExtra = :id", { id })
            .execute();

        if (result.affected === 0) {
            throw new NotFoundException(`Registro con ID ${id} no encontrado`);
        }
        
        return { success: true, message: `Registro con ID ${id} actualizado.` };
    } catch (error) {
        console.error('Error en update:', error);
        throw new Error(`Error al actualizar: ${error.message}`);
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
