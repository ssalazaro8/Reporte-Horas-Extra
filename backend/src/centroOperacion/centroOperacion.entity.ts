import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'CentroOperacion'})
export class CentroOperacion {
  @PrimaryGeneratedColumn()
  ID_CentroOperacion: number;

  @Column({ unique: true })
  Codigo: string;

  @Column()
  Nombre: string;
}
