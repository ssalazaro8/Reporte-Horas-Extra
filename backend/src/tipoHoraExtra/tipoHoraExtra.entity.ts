import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({name: 'TipoHoraExtra'})
export class TipoHoraExtra {
  @PrimaryGeneratedColumn()
  ID_TipoHoraExtra: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  Nombre: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  CodigoCC: string;


}
