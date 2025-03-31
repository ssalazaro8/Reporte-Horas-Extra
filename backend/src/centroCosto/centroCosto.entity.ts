import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'CentroCosto'})
export class CentroCosto {
  @PrimaryGeneratedColumn()
  ID_CentroCosto: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  Codigo: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;
}
