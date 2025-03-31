import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HorasExtraService } from '../../services/horas-extra.service';
import { CentrosService } from '../../services/centros.service';
import { CommonModule } from '@angular/common';
import { NavbarRegistrosComponent } from "../navbar-registros/navbar-registros.component";

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
    filtrarRegistros(): void {
        // Valida si el formulario de filtro es válido
        if (!this.formFiltro.valid) {
            alert('Por favor complete todos los campos del filtro.');
            return;
        }

        // Obtiene los valores del formulario de filtro
        const { puntoServicio, fechaInicio, fechaFin } = this.formFiltro.value;

        console.log('Filtrando con punto de servicio:', puntoServicio);
        console.log('Filtrando con fecha inicio:', fechaInicio);
        console.log('Filtrando con fecha fin:', fechaFin);

        // Llama al servicio para obtener los registros filtrados
        this.horasExtraService.getFilteredRegistros(puntoServicio, fechaInicio, fechaFin).subscribe((data: any[]) => {
            this.filteredRegistros = data;
            this.showActions = true; // Muestra los botones de acción después de filtrar
        });
    }

    // Consulta todos los registros (sin filtrar)
    consultarRegistros(): void {
        if (!this.formFiltro.valid) {
            alert('Por favor complete todos los campos del filtro.');
            return;
        }

        this.getRegistros();
        this.showActions = false;
    }

    // Edita un registro seleccionado
    editarRegistro(registro: any): void {
        this.registroSeleccionado = registro;
        // Parchea los valores del formulario de edición con los datos del registro seleccionado
        this.formEditarRegistro.patchValue({
            numeroDocumento: registro.NumeroDocumento,
            primerApellido: registro.PrimerApellido,
            segundoApellido: registro.SegundoApellido,
            nombre: registro.Nombre,
            fechaHoExt: new Date(registro.FechaHoExt).toISOString().split('T')[0], // Formatea la fecha
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
        });
        $('#editarRegistroModal').modal('show'); // Abre el modal
    }

    // Guarda los cambios realizados en el formulario de edición
    guardarCambios(): void {
        if (this.formEditarRegistro.valid) {
            // Crea un objeto con los datos actualizados del registro
            const updatedRegistro = {
                ID_HoraExtra: this.registroSeleccionado.ID_HoraExtra,
                ...this.formEditarRegistro.value
            };
    
            console.log('Registro a actualizar:', updatedRegistro);
    
            // Llama al servicio para actualizar el registro
            this.horasExtraService.updateRegistro(updatedRegistro).subscribe({
                next: (response) => {
                    console.log('Registro actualizado:', response);
                    this.getRegistros();
                    alert('Registro actualizado con éxito');
                },
                error: (error) => {
                    console.error('Error al actualizar el registro:', error);
                    alert('Error al actualizar el registro. Por favor, intente de nuevo.');
                }
            });
        } else {
            alert('Por favor, complete todos los campos requeridos.');
        }
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
