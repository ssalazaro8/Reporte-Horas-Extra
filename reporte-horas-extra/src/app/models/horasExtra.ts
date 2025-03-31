export interface HorasExtra {
    ID_HoraExtra?: number;
    NumeroDocumento: string;
    PrimerApellido?: string | null;
    SegundoApellido?: string | null;
    Nombre?: string | null;
    FechaHoExt?: string | null;
    ID_TipoHoraExtra: string;
    NumeroHoras: number;
    Motivo: string;
    FormaPago: string;
    HorarioHabitual?: string | null;
    HoraEntrada?: string | null;
    HoraSalida?: string | null;
    TiempoAlimentacion?: string | null;
    CentroCosto: string;
    CentroOperacion: string;
    PuntoServicio: string;
}
