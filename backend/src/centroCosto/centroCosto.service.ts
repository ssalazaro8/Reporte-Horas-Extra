import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CentroCosto } from './centroCosto.entity';

@Injectable()
export class CentroCostoService {
  constructor(
    @InjectRepository(CentroCosto)
    private readonly centroCostoRepository: Repository<CentroCosto>,
  ) {}

  async findAll(): Promise<Pick<CentroCosto, 'Codigo' | 'Nombre'>[]> {
    return await this.centroCostoRepository.find({
      select: ['Codigo', 'Nombre'],
    });
  }
  

  async findById(id: number): Promise<CentroCosto> {
    return await this.centroCostoRepository.findOne({ where: { ID_CentroCosto: id } });
  }

  async create(centroCosto: CentroCosto): Promise<CentroCosto> {
    return await this.centroCostoRepository.save(centroCosto);
  }

  async update(id: number, data: Partial<CentroCosto>): Promise<void> {
    await this.centroCostoRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.centroCostoRepository.delete(id);
  }
}
