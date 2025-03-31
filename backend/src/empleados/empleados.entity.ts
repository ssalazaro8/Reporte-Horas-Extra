import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Empleados')
export class Empleados {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  NumeroDocumento: string;

  @Column({ type: 'varchar', length: 150 })
  Nombres: string;

  @Column({ type: 'varchar', length: 150 })
  PrimerApellido: string; 

  @Column({ type: 'varchar', length: 150 })
  SegundoApellido: string; 
  horasExtras: any;
}
