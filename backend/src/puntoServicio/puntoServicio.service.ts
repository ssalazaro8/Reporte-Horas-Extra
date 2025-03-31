import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PuntoServicio } from '../puntoServicio/puntoServicio.entity';
import { CreatePuntoServicioDto } from './dto/create-punto-servicio.dto';
import { UpdatePuntoServicioDto } from './dto/update-punto-servicio.dto';

@Injectable()
export class PuntoServicioService {
  constructor(
    @InjectRepository(PuntoServicio)
    private puntoServicioRepository: Repository<PuntoServicio>,
  ) {}

  async create(createPuntoServicioDto: CreatePuntoServicioDto): Promise<PuntoServicio> {
    const puntoServicio = this.puntoServicioRepository.create(createPuntoServicioDto);
    return await this.puntoServicioRepository.save(puntoServicio);
  }

  async findAll(): Promise<PuntoServicio[]> {
    return await this.puntoServicioRepository.find();
  }

  async findOne(id: number): Promise<PuntoServicio> {
    const puntoServicio = await this.puntoServicioRepository.findOne({ where: { ID_PuntoServicio: id } });
    if (!puntoServicio) {
      throw new NotFoundException(`Punto de Servicio con ID ${id} no encontrado`);
    }
    return puntoServicio;
  }

  async update(id: number, updatePuntoServicioDto: UpdatePuntoServicioDto): Promise<PuntoServicio> {
    const puntoServicio = await this.puntoServicioRepository.findOne({ where: { ID_PuntoServicio: id } });
    if (!puntoServicio) {
      throw new NotFoundException(`Punto de Servicio con ID ${id} no encontrado`);
    }

    this.puntoServicioRepository.merge(puntoServicio, updatePuntoServicioDto);
    return await this.puntoServicioRepository.save(puntoServicio);
  }

  async remove(id: number): Promise<void> {
    const result = await this.puntoServicioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Punto de Servicio con ID ${id} no encontrado`);
    }
  }
}
