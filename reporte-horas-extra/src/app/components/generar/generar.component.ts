import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
    selector: 'app-generar',
    templateUrl: './generar.component.html',
    styleUrls: ['./generar.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule]
})
export class GenerarComponent implements OnInit {
    filtroForm: FormGroup;
    registros: any[] = [];

    constructor(private http: HttpClient, private router: Router) {
        this.filtroForm = new FormGroup({
            fechaDesde: new FormControl('', Validators.required),
            fechaHasta: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void { }

    filtrarRegistros(): void {
        const { fechaDesde, fechaHasta } = this.filtroForm.value;

        if (!fechaDesde || !fechaHasta) {
            alert('Por favor, seleccione un rango de fechas válido.');
            return;
        }

        this.http.get<any[]>('http://localhost:3000/horas-extra', { params: { documento: '' } })
            .subscribe({
                next: (data) => {
                    const filteredRegistros = data.filter(registro => {
                        const fechaRegistro = new Date(registro.FechaHoExt);
                        const fechaDesdeFilter = new Date(fechaDesde);
                        const fechaHastaFilter = new Date(fechaHasta);

                        return fechaRegistro >= fechaDesdeFilter && fechaRegistro <= fechaHastaFilter;
                    });

                    this.registros = filteredRegistros.map(registro => ({
                        empleado: `${registro.Nombre} ${registro.PrimerApellido} ${registro.SegundoApellido}`,
                        cedula: registro.NumeroDocumento,
                        co: registro.CentroOperacion,
                        centroCosto: registro.CentroCosto,
                        fechaHoraExtra: registro.FechaHoExt,
                        horas: registro.NumeroHoras,
                        concepto: registro.Motivo,
                        puntoServicio: registro.PuntoServicio,

                    }));
                },
                error: (error) => {
                    console.error('Error al consultar empleados:', error);
                    alert('Error al consultar empleados');
                }
            });
    }

    exportarExcel(): void {
        if (!this.registros.length) {
            alert('No hay registros para exportar.');
            return;
        }
    
        // Cabeceras personalizadas (como en el HTML)
        const header = [
            "EMPLEADO", "SUC.", "CONCEPTO", "CO MOV.", "C. COSTO", "FECHA MOV.",
            "FECHA INI. TNL", "FECHA FIN TNL", "DIAS TNL", "ACTIVIDAD", "UBICACIÓN",
            "HORAS", "VALOR", "CANTIDAD", "CUOTA NRO", "FEC. PAG HAST. INT. CESAN.",
            "CEDULA", "PROYECTO", "CANT. (ACTIVIDAD-DESTAJO)", "UBICA. LABO.",
            "DIAS LAB. TIP. COT. 51", "HORAS NVO"
        ];
    
        // Convertir registros a arreglo plano
        const data = this.registros.map(r => [
            r.empleado, r.sucursal, r.concepto, r.co, r.centroCosto, r.fechaHoraExtra,
            r.fechaIniTNL, r.fechaFinTNL, r.diasTNL, r.actividad, r.ubicacion,
            r.horas, r.valor, r.cantidad, r.cuotaNro, r.fechaPagoCesan,
            r.cedula, r.proyecto, r.cantidadDestajo, r.puntoServicio,
            r.diasCot51, r.horasNvo
        ]);
    
        // Crear hoja
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([header, ...data]);
    
        // Estilos en cabecera (primera fila)
        const range = XLSX.utils.decode_range(ws['!ref'] || '');
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = XLSX.utils.encode_cell({ c: C, r: 0 });
            const cell = ws[cell_address];
    
            if (cell) {
                cell.s = {
                    fill: {
                        fgColor: { rgb: "007BFF" }
                    },
                    font: {
                        bold: true,
                        color: { rgb: "FFFFFF" }
                    },
                    alignment: {
                        horizontal: "center"
                    }
                };
            }
        }
    
        // Crear libro y exportar
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reporte Horas Extra");
    
        // Aplicar estilos (necesita escribir con 'bookType: xlsx', 'cellStyles: true')
        XLSX.writeFile(wb, "reporte_horas_extra.xlsx", { bookType: 'xlsx', cellStyles: true });
    }
    
    salir(): void {
        this.router.navigate(['/']); // Ajusta la ruta según tu configuración
    }

    @ViewChild('tablaContainer', { static: false }) tablaContainer!: ElementRef;

scrollTabla(direccion: 'left' | 'right') {
    const scrollAmount = 300;
    if (this.tablaContainer) {
        const container = this.tablaContainer.nativeElement;
        container.scrollLeft += direccion === 'right' ? scrollAmount : -scrollAmount;
    }
}

}
