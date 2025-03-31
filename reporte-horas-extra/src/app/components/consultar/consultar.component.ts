import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent {
  formConsultar: FormGroup;
  empleados: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.formConsultar = new FormGroup({
      documento: new FormControl('', { validators: [this.documentoValidator] }),
      fechaDesde: new FormControl(''),
      fechaHasta: new FormControl(''), 
    });
  }

  // Validador para el documento
  documentoValidator(control: AbstractControl) {
    const documento = control.value;
    return documento && documento.trim() !== '' ? null : { required: true };
  }

  buscar() {
    const { documento, fechaDesde, fechaHasta } = this.formConsultar.value;
    const params: any = {};

    // Validar que el documento no esté vacío
    if (!documento) {
      alert('El documento es obligatorio.');
      return;
    }

    params.documento = documento;

    // Agregar fechas a los parámetros si están presentes
    if (fechaDesde) params.fechaDesde = fechaDesde;
    if (fechaHasta) params.fechaHasta = fechaHasta;

    // Realizar la consulta a la API
    this.http.get<any[]>('http://localhost:3000/horas-extra', { params })
      .subscribe({
        next: (data) => {
          if (data.length === 0) {
            alert('No se encontraron registros para el documento ingresado.');
          }
          this.empleados = data;
        },
        error: () => alert('Error al consultar empleados')
      });
  }

  salir(): void {
    this.router.navigate(['/']); // Ajusta la ruta según tu configuración
}
}
