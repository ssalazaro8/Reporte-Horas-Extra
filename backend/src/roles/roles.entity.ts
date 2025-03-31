// roles/roles.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Roles')
export class Roles {
  @PrimaryGeneratedColumn()
  ID_Rol: number;

  @Column({ type: 'varchar', length: 50 })
  Nombre: string;
}
