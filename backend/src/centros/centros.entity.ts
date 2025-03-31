// centro.entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Centros')
export class Centro {
    @PrimaryColumn()
    CentroCosto: string;

    @Column()
    CentroOperacion: string;

    @Column()
    PuntoServicio: string;
}