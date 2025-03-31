import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoHoraExtra } from '../tipoHoraExtra/tipoHoraExtra.entity';

@Injectable()
export class TipoHoraExtraService {
  constructor(
    @InjectRepository(TipoHoraExtra)
    private readonly tipoHoraExtraRepository: Repository<TipoHoraExtra>,
  ) {}

  async create(tipoHoraExtra: TipoHoraExtra): Promise<TipoHoraExtra> {
    return await this.tipoHoraExtraRepository.save(tipoHoraExtra);
  }

  async findAll(): Promise<TipoHoraExtra[]> {
    return await this.tipoHoraExtraRepository.find();
  }

  async findByName(nombre: string): Promise<TipoHoraExtra> {
    const tipoHoraExtra = await this.tipoHoraExtraRepository.findOne({ where: { Nombre: nombre } });
    if (!tipoHoraExtra) {
      throw new NotFoundException(`Tipo de Hora Extra con nombre "${nombre}" no encontrado`);
    }
    return tipoHoraExtra;
  }

  async update(id: number, tipoHoraExtra: TipoHoraExtra): Promise<TipoHoraExtra> {
    const existingTipoHoraExtra = await this.tipoHoraExtraRepository.findOne({ where: { ID_TipoHoraExtra: id } });
    if (!existingTipoHoraExtra) {
      throw new NotFoundException(`Tipo de Hora Extra con ID "${id}" no encontrado`);
    }

    await this.tipoHoraExtraRepository.update(id, tipoHoraExtra);
    return this.tipoHoraExtraRepository.findOne({ where: { ID_TipoHoraExtra: id } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.tipoHoraExtraRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de Hora Extra con ID "${id}" no encontrado`);
    }
  }
}
