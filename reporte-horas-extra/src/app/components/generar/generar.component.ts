import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
                        co: registro.ID_CentroOperacion,
                        centroCosto: registro.ID_CentroCosto,
                        fechaHoraExtra: registro.FechaHoExt,
                        horas: registro.NumeroHoras,
                        concepto: registro.Motivo,
                        ID_TipoHoraExtra: registro.ID_TipoHoraExtra
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

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.registros);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reporte Horas Extra");

        XLSX.writeFile(wb, "reporte_horas_extra.xlsx");
    }

    salir(): void {
        this.router.navigate(['/']); // Ajusta la ruta según tu configuración
    }
}
