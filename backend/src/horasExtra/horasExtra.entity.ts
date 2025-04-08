import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'HorasExtra' })
export class HorasExtra {
    @PrimaryGeneratedColumn()
    ID_HoraExtra!: number;

    @Column({ type: 'varchar', length: 20 })
    NumeroDocumento!: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    PrimerApellido?: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    SegundoApellido?: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Nombre?: string;

    @Column({ type: 'date', nullable: true })
    FechaHoExt?: Date;

    @Column()
    ID_TipoHoraExtra: string;

    @Column({ type: 'int' })
    NumeroHoras!: number;

    @Column({ type: 'varchar', length: 255 })
    Motivo!: string;

    @Column({ type: 'varchar', length: 50 })
    FormaPago!: string;

    @Column({ type: 'varchar', nullable: true })
    HorarioHabitual?: string;

    @Column({ type: 'time', nullable: true })
    HoraEntrada?: string;

    @Column({ type: 'time', nullable: true })
    HoraSalida?: string;

    @Column({ type: 'varchar', length: 20 })
    TiempoAlimentacion!: string;

   @Column()
   CentroCosto!: string; // Almacena el centro de costo

   @Column()
   CentroOperacion!: string; // Almacena el centro de operación

   @Column()
   PuntoServicio!: string; // Almacena el punto de servicio
}
