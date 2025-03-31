// centros.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Centro } from './centros.entity';

@Injectable()
export class CentrosService {
    constructor(
        @InjectRepository(Centro)
        private readonly centroRepository: Repository<Centro>,
    ) {}

    async findAll(): Promise<Centro[]> {
        return this.centroRepository.find();
    }
}