import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'PuntoServicio' })
export class PuntoServicio {
  @PrimaryGeneratedColumn()
  ID_PuntoServicio: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  Codigo: string;

  @Column({ type: 'varchar', length: 100 })
  Nombre: string;
}
