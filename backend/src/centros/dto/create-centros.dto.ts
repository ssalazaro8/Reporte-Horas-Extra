// create-centro.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateCentroDto {
    @IsNotEmpty()
    CentroCosto: string;

    @IsNotEmpty()
    CentroOperacion: string;

    @IsNotEmpty()
    PuntoServicio: string;
}