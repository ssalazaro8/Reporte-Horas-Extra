// centros.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CentrosService } from './centros.service';
import { Centro } from './centros.entity';

@Controller('centros')
export class CentrosController {
    constructor(private readonly centrosService: CentrosService) {}

    @Get()
    async getCentros(): Promise<Centro[]> {
        return this.centrosService.findAll();
    }
}