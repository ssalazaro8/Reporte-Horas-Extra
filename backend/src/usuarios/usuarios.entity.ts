// usuarios/usuarios.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Usuarios')
export class Usuarios {
  @PrimaryGeneratedColumn()
  ID_Usuario: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  Usuario: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  Email: string;

  @Column({ type: 'varchar', length: 255 })
  Contrasena: string;

  @Column({ type: 'int' }) // Almacena el ID_Rol como un número
  ID_Rol: number;
}
