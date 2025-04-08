import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorasExtraService } from '../../services/horas-extra.service';
import { CentrosService } from '../../services/centros.service';
import { CommonModule } from '@angular/common';
import { NavbarRegistrosComponent } from "../navbar-registros/navbar-registros.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HorasExtra } from '../../models/horasExtra';

declare var $: any; // Declaración para usar jQuery

@Component({
    selector: 'app-revision',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FormsModule, NavbarRegistrosComponent],
    templateUrl: './revision.component.html',
    styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {
    // Formulario para el filtro de registros
    formFiltro: FormGroup;
    // Formulario para editar un registro
    formEditarRegistro: FormGroup;
    // Lista de todos los registros
    registros: any[] = [];
    // Lista de registros filtrados
    filteredRegistros: any[] = [];
    // Lista de puntos de servicio
    puntosServicio: any[] = [];
    fechaInicio: string = '';
    fechaFin: string = '';
    // Controla si se muestran las acciones en la tabla
    showActions: boolean = true;
    // Registro seleccionado para editar
    registroSeleccionado: any;

    constructor(
        private fb: FormBuilder,
        private horasExtraService: HorasExtraService,
        private centroService: CentrosService
    ) {
        // Inicialización del formulario de filtro
        this.formFiltro = this.fb.group({
            puntoServicio: ['', Validators.required],
            fechaInicio: ['', Validators.required],
            fechaFin: ['', Validators.required]
        });

        // Inicialización del formulario de edición de registro
        this.formEditarRegistro = this.fb.group({
            numeroDocumento: ['', Validators.required],
            primerApellido: ['', Validators.required],
            segundoApellido: [''],
            nombre: [''],
            fechaHoExt: ['', Validators.required],
            idTipoHoraExtra: ['', Validators.required],
            numeroHoras: ['', Validators.required],
            motivo: ['', Validators.required],
            formaPago: ['', Validators.required],
            horarioHabitual: ['', Validators.required],
            horaEntrada: [''],
            horaSalida: [''],
            tiempoAlimentacion: ['', Validators.required],
            centroCosto: ['', Validators.required],
            centroOperacion: ['', Validators.required],
            puntoServicio: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        // Carga los puntos de servicio y los registros al inicializar el componente
        this.getPuntosServicio();
        this.getRegistros();
    }

    // Obtiene los puntos de servicio desde el servicio correspondiente
    getPuntosServicio(): void {
        this.centroService.getCentros().subscribe((data: any[]) => {
            // Mapea los datos y ordena por nombre
            this.puntosServicio = data.map(ps => ({
                id: ps.PuntoServicio,
                nombre: ps.PuntoServicio
            })).sort((a, b) => a.nombre.localeCompare(b.nombre));
        });
    }
    

    // Obtiene todos los registros desde el servicio de horas extras
    getRegistros(): void {
        this.horasExtraService.getAllRegistros().subscribe((data: any[]) => {
            console.log('Registros cargados:', data);
            this.registros = data;
        });
    }

    // Filtra los registros según los criterios del formulario de filtro
// En revision.component.ts
filtrarRegistros(): void {
    if (this.formFiltro.invalid) {
      Object.keys(this.formFiltro.controls).forEach(key => {
        this.formFiltro.get(key)?.markAsTouched();
      });
      return;
    }
  
    const { puntoServicio, fechaInicio, fechaFin } = this.formFiltro.value;
    
    // Validación adicional de fechas
    if (new Date(fechaInicio) > new Date(fechaFin)) {
      alert('La fecha de inicio no puede ser mayor a la fecha final');
      return;
    }
  
    // Formatear fechas correctamente
    const fechaDesde = new Date(fechaInicio).toISOString().split('T')[0];
    const fechaHasta = new Date(fechaFin).toISOString().split('T')[0];
  
    console.log('Enviando solicitud con:', { puntoServicio, fechaDesde, fechaHasta });
  
    this.horasExtraService.getFilteredRegistros(puntoServicio, fechaDesde, fechaHasta).subscribe({
      next: (data: any[]) => {
        console.log('Datos recibidos del servidor:', data);
        if (data && data.length > 0) {
          this.filteredRegistros = data;
          this.showActions = true;
        } else {
          this.filteredRegistros = [];
          alert('No se encontraron registros con los criterios especificados');
        }
      },
      error: (error) => {
        console.error('Error completo:', error);
        this.filteredRegistros = [];
        alert(`Error al filtrar registros: ${error.message}`);
      }
    });
  }
  
  // Método para consultar todos los registros
  consultarRegistros(): void {
    this.horasExtraService.getAllRegistros().subscribe({
      next: (data: any[]) => {
        console.log('Todos los registros:', data);
        this.filteredRegistros = Array.isArray(data) ? data : [];
        this.showActions = false;
      },
      error: (error) => {
        console.error('Error al consultar:', error);
        this.filteredRegistros = [];
      }
    });
  }

// Método para abrir el modal con datos
editarRegistro(registro: HorasExtra): void {
    this.registroSeleccionado = { ...registro };
    
    const formData = {
      numeroDocumento: registro.NumeroDocumento,
      primerApellido: registro.PrimerApellido,
      segundoApellido: registro.SegundoApellido,
      nombre: registro.Nombre,
      fechaHoExt: this.formatDate(registro.FechaHoExt || ''),
      idTipoHoraExtra: registro.ID_TipoHoraExtra,
      numeroHoras: registro.NumeroHoras,
      motivo: registro.Motivo,
      formaPago: registro.FormaPago,
      horarioHabitual: registro.HorarioHabitual,
      horaEntrada: registro.HoraEntrada,
      horaSalida: registro.HoraSalida,
      tiempoAlimentacion: registro.TiempoAlimentacion,
      centroCosto: registro.CentroCosto,
      centroOperacion: registro.CentroOperacion,
      puntoServicio: registro.PuntoServicio
    };
  
    this.formEditarRegistro.patchValue(formData);
    $('#editarRegistroModal').modal('show');
  }
  
// Método para mostrar mensaje de éxito
mostrarMensajeExito(mensaje: string): void {
    // Implementación para mostrar un mensaje de éxito
    // Puedes usar un servicio de notificaciones o simplemente un alert
    alert(mensaje);
  }
  
  // Método para mostrar mensaje de error
  mostrarError(mensaje: string): void {
    // Implementación para mostrar un mensaje de error
    // Puedes usar un servicio de notificaciones o simplemente un alert
    alert(mensaje);
  }
  
  // Método para marcar controles inválidos
  marcarControlesInvalidos(): void {
    Object.values(this.formEditarRegistro.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  
  guardarCambios(): void {
    if (this.formEditarRegistro.valid) {
        const formValue = this.formEditarRegistro.value;
        
        const payload: HorasExtra = {
            ...this.registroSeleccionado, // Mantener el ID original
            NumeroDocumento: formValue.numeroDocumento,
            PrimerApellido: formValue.primerApellido,
            // ... otros campos ...
            FechaHoExt: formValue.fechaHoExt, // Ya viene formateado del input date
            // ... resto de campos ...
        };

        this.horasExtraService.updateRegistro(payload).subscribe({
            next: () => {
                alert('Actualizado correctamente');
                $('#editarRegistroModal').modal('hide');
                this.filtrarRegistros(); // Refrescar datos
            },
            error: (err) => {
                console.error('Error detallado:', err);
                alert('Error al actualizar: ' + err.message);
            }
        });
    } else {
        this.marcarControlesInvalidos();
    }
}
  
  // Método auxiliar para formato de fecha
  private formatDate(fecha: string | Date): string {
      if (!fecha) return '';
      const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
      return date.toISOString().split('T')[0];
    }
  
    // Elimina un registro
    eliminarRegistro(id: number): void {
        this.horasExtraService.deleteRegistro(id).subscribe(() => {
            this.getRegistros();
            this.filtrarRegistros();
        });
    }

    // Guarda todos los cambios realizados en los registros filtrados
    guardarTodosCambios(): void {
        this.filteredRegistros.forEach(registro => {
            this.horasExtraService.updateRegistro(registro).subscribe(() => {
                console.log('Registro actualizado:', registro);
            });
        });
    }
}
