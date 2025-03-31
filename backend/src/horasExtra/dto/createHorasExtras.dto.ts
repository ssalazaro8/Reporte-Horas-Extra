import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHorasExtraDto {
    @IsNotEmpty()
    NumeroDocumento!: string;

    @IsOptional()
    PrimerApellido?: string;

    @IsOptional()
    SegundoApellido?: string;

    @IsOptional()
    Nombre?: string;

    @IsOptional()
    FechaHoExt?: Date;

    @IsNotEmpty()
    @IsString()
    ID_TipoHoraExtra!: string;

    @IsNotEmpty()
    @IsNumber()
    NumeroHoras!: number;

    @IsNotEmpty()
    Motivo!: string;

    @IsNotEmpty()
    FormaPago!: string;

    @IsNotEmpty()
    HorarioHabitual!: string;

    @IsOptional()
    HoraEntrada?: string;

    @IsOptional()
    HoraSalida?: string;

    @IsNotEmpty()
    TiempoAlimentacion!: string;

    @IsNotEmpty()
    CentroCosto!: string; // Campo para el centro de costo

    @IsNotEmpty()
    CentroOperacion!: string; // Campo para el centro de operación

    @IsNotEmpty()
    PuntoServicio!: string; // Campo para el punto de servicio
}
