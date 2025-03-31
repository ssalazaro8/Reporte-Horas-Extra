// roles/roles.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<Roles> {
        try {
            const newRole = this.rolesRepository.create(createRoleDto);
            return await this.rolesRepository.save(newRole);
        } catch (error) {
            console.error('Error al crear el rol:', error);
            throw new InternalServerErrorException('Error al crear el rol en la base de datos');
        }
    }

    // Método para obtener todos los roles sin paginación
    async findAll(): Promise<Roles[]> {
        try {
            return await this.rolesRepository.find();
        } catch (error) {
            console.error('Error al obtener los roles:', error);
            throw new InternalServerErrorException('Error al obtener los roles de la base de datos');
        }
    }

    async findOne(id: number): Promise<Roles> {
        try {
            const role = await this.rolesRepository.findOne({ where: { ID_Rol: id } });
            if (!role) {
                throw new NotFoundException(`Rol con ID ${id} no encontrado`);
            }
            return role;
        } catch (error) {
            console.error('Error al buscar el rol:', error);
            throw new InternalServerErrorException('Error al buscar el rol en la base de datos');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const role = await this.rolesRepository.findOne({ where: { ID_Rol: id } });
            if (!role) {
                throw new NotFoundException(`Rol con ID ${id} no existe.`);
            }
            await this.rolesRepository.remove(role);
        } catch (error) {
            console.error('Error al eliminar el rol:', error);
            throw new InternalServerErrorException('Error al eliminar el rol de la base de datos');
        }
    }
}
