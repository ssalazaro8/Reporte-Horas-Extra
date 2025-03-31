import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  async findOneByEmail(email: string): Promise<Usuarios | null> {
    try {
      const usuario = await this.usuariosRepository.createQueryBuilder('Usuarios')
        .where('Usuarios.Email = :email', { email })
        .getOne();

      if (!usuario) {
        return null;
      }

      return usuario;
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw new InternalServerErrorException('Error al obtener usuario por email');
    }
  }

  async validateCredentials(email: string, contrasena: string): Promise<Usuarios> {
    const usuario = await this.findOneByEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Email incorrecto');
    }

    const isMatch = await bcrypt.compare(contrasena, usuario.Contrasena);

    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return usuario;
  }
  
  async findOne(id: number): Promise<Usuarios> {
    try {
      const usuario = await this.usuariosRepository.findOneBy({ ID_Usuario: id });
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      return usuario;
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw new InternalServerErrorException('Error al obtener usuario por ID');
    }
  }

  async create(usuario: Partial<Usuarios>): Promise<Usuarios> {
    try {
      // Hash de la contraseña antes de guardar
      const hashedPassword = await bcrypt.hash(usuario.Contrasena, 10);
      usuario.Contrasena = hashedPassword;

      const nuevoUsuario = this.usuariosRepository.create(usuario);
      return this.usuariosRepository.save(nuevoUsuario);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new InternalServerErrorException('Error al crear usuario');
    }
  }

  async findAll(): Promise<Usuarios[]> {
    try {
      return this.usuariosRepository.find();
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw new InternalServerErrorException('Error al obtener todos los usuarios');
    }
  }

  async update(id: number, usuario: Partial<Usuarios>): Promise<Usuarios> {
    try {
      await this.usuariosRepository.update(id, usuario);
      return this.findOne(id);
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error);
      throw new InternalServerErrorException(`Error al actualizar usuario con ID ${id}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usuariosRepository.delete(id);
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error);
      throw new InternalServerErrorException(`Error al eliminar usuario con ID ${id}`);
    }
  }

  async findAllPaginated(page: number, size: number): Promise<Usuarios[]> {
    try {
      const entityManager = getManager();
      const query = `
        WITH PaginatedUsers AS (
          SELECT *, ROW_NUMBER() OVER (ORDER BY ID_Usuario ASC) AS row_num
          FROM Usuarios
        )
        SELECT * FROM PaginatedUsers
        WHERE row_num BETWEEN :offset + 1 AND :offset + :size
      `;

      const offset = (page - 1) * size;

      const usuarios = await entityManager.query(query, [offset, size]);

      return usuarios;
    } catch (error) {
      console.error('Error al obtener usuarios paginados:', error);
      throw new InternalServerErrorException('Error al obtener usuarios paginados');
    }
  }
}
