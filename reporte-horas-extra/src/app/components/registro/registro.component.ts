import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { CentroOperacionService } from '../../services/centroOperacion.service';
import { PuntoServicioService } from '../../services/puntoServicio.service';
import { CentroCostoService } from '../../services/centroCosto.service';
import { TipoHoraExtraService } from '../../services/tipoHoraExtra.service';
import { TipoHoraExtra } from '../../models/tipoHoraExtra';
import { EmpleadosService } from '../../services/empleados.service';
import { HorasExtraService } from '../../services/horas-extra.service';
import { Router } from '@angular/router';
import { HorasExtra } from '../../models/horasExtra';
import { CentrosService } from '../../services/centros.service';
import { NavbarRegistrosComponent } from '../navbar-registros/navbar-registros.component';

@Component({
    selector: 'app-registro',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FormsModule, NavbarRegistrosComponent],
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css'],
    providers: [
        CentrosService,
        TipoHoraExtraService,
        EmpleadosService,
        HorasExtraService,
        DatePipe
    ]
})
export class RegistroComponent implements OnInit {
    registros: FormGroup[] = [];
    formFijo: FormGroup;
    tiposHoraExtra: TipoHoraExtra[] = [];
    centroCostos: any[] = [];
    centroOperaciones: any[] = [];
    puntoServicios: any[] = [];
    fechaMinima: string = '';
    fechaMaxima: string = '';
    quincenaActual: number = 0;

    constructor(
        private fb: FormBuilder,
        private tipoHoraExtraService: TipoHoraExtraService,
        private empleadosService: EmpleadosService,
        private horasExtraService: HorasExtraService,
        private CentrosService: CentrosService,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private datePipe: DatePipe
    ) {
        this.formFijo = this.fb.group({
            centroCosto: [{ value: '', disabled: true }, Validators.required],
            centroOperacion: [{ value: '', disabled: true }, Validators.required],
            puntoServicio: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.getCentros();
        this.getTiposHoraExtra();
        this.actualizarFechas();
        this.addRegistro();
    }

    getCentros(): void {
        this.CentrosService.getCentros().subscribe((data: any[]) => {
            this.puntoServicios = data
                .map(ps => ({
                    id: ps.PuntoServicio,
                    nombre: ps.PuntoServicio,
                    centroCosto: ps.CentroCosto,
                    centroOperacion: ps.CentroOperacion
                }))
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
        });
    }

    getTiposHoraExtra(): void {
        this.tipoHoraExtraService.getTiposHoraExtras().subscribe(
            (data: TipoHoraExtra[]) => {
                this.tiposHoraExtra = data;
            },
            (error) => {
                console.error('Error al obtener los tipos de hora extra:', error);
            }
        );
    }

    onPuntoServicioChange(): void {
        const selectedPuntoServicio = this.formFijo.get('puntoServicio')?.value;
        const selectedCentro = this.puntoServicios.find(ps => ps.id === selectedPuntoServicio);

        if (selectedCentro) {
            this.formFijo.patchValue({
                centroCosto: selectedCentro.centroCosto,
                centroOperacion: selectedCentro.centroOperacion
            });
        } else {
            this.formFijo.patchValue({
                centroCosto: '',
                centroOperacion: ''
            });
        }
    }

    horasExtraValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const valor = control.value;
            const regex = /^\d+(\.\d{1})?$/;
            if (valor && !regex.test(valor.toString())) {
                return { invalidHorasExtra: true };
            }
            return null;
        };
    }

    soloNumerosYPuntos(event: KeyboardEvent): void {
        const tecla = event.key;
        if (!/^\d+$/.test(tecla) && tecla !== '.' && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight') {
            event.preventDefault();
        }
    }

    actualizarFechas(): void {
        const hoy = new Date();
        const mesActual = hoy.getMonth();
        const anioActual = hoy.getFullYear();
        const diaActual = hoy.getDate();
    
        if (diaActual >= 9 && diaActual <= 23) {
            this.quincenaActual = 2;
            this.fechaMinima = `${anioActual}-${String(mesActual + 1).padStart(2, '0')}-09`;
            this.fechaMaxima = `${anioActual}-${String(mesActual + 1).padStart(2, '0')}-23`;
        } else {
            this.quincenaActual = 1;
            const mesAnterior = mesActual - 1;
            const anioAnterior = mesAnterior < 0 ? anioActual - 1 : anioActual;
            this.fechaMinima = `${anioAnterior}-${String(mesAnterior + 1).padStart(2, '0')}-24`;
            this.fechaMaxima = `${anioActual}-${String(mesActual + 1).padStart(2, '0')}-08`;
        }
    }
    

    createRegistroForm(): FormGroup {
        return this.fb.group({
            NumeroDocumento: ['', Validators.required],
            PrimerApellido: [''],
            SegundoApellido: [''],
            Nombre: [''],
            FechaHoExt: ['', [Validators.required]],
            ID_TipoHoraExtra: ['', Validators.required],
            NumeroHoras: ['', [Validators.required, this.horasExtraValidator()]],
            Motivo: ['', Validators.required],
            FormaPago: ['Nómina', Validators.required],
            HorarioHabitualDesdeHora: ['', Validators.required],
            HorarioHabitualDesdeMinuto: ['', Validators.required],
            HorarioHabitualDesdeAMPM: ['AM', Validators.required],
            HorarioHabitualHastaHora: ['', Validators.required],
            HorarioHabitualHastaMinuto: ['', Validators.required],
            HorarioHabitualHastaAMPM: ['PM', Validators.required],
            TiempoAlimentacionDesdeHora: ['', Validators.required],
            TiempoAlimentacionDesdeMinuto: ['', Validators.required],
            TiempoAlimentacionDesdeAMPM: ['AM', Validators.required],
            TiempoAlimentacionHastaHora: ['', Validators.required],
            TiempoAlimentacionHastaMinuto: ['', Validators.required],
            TiempoAlimentacionHastaAMPM: ['PM', Validators.required],
            HoraEntrada: ['', Validators.required],
            HoraSalida: ['', Validators.required]
        });
    }

    buscarEmpleado(registro: FormGroup): void {
        const numeroDocumentoControl = registro.get('NumeroDocumento');

        if (numeroDocumentoControl && numeroDocumentoControl.value) {
            const numeroDocumento = numeroDocumentoControl.value;
            if (numeroDocumento) {
                this.empleadosService.getEmpleadoPorDocumento(numeroDocumento).subscribe(
                    (data) => {
                        registro.patchValue({
                            PrimerApellido: data.PrimerApellido,
                            SegundoApellido: data.SegundoApellido,
                            Nombre: data.Nombres
                        });
                    },
                    (error) => {
                        console.error('Error al obtener el empleado:', error);
                        alert('Empleado no encontrado');
                    }
                );
            }
        }
    }

    addRegistro(): void {
        if (this.registros.length > 0 && !this.registros[this.registros.length - 1].valid) {
            alert('Por favor, complete todos los campos del formulario anterior antes de añadir uno nuevo.');
            return;
        }
    
        if (!this.formFijo.valid) {
            alert('Por favor seleccione un Punto de Servicio antes de añadir un registro.');
            return;
        }
    
        const newRegistro = this.createRegistroForm();
        this.registros.push(newRegistro);
    }
    
    removeRegistro(index: number): void {
        this.registros.splice(index, 1);
    }

    markAllAsTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            if (control instanceof FormGroup) {
                this.markAllAsTouched(control);
            } else {
                control.markAsTouched();
            }
        });
    }

    finalizarRegistros(): void {
        if (!this.formFijo.valid) {
            alert('Por favor complete los campos fijos antes de finalizar.');
            return;
        }
    
        // Marcar todos los campos como "touched" para forzar la validación
        this.registros.forEach(registro => this.markAllAsTouched(registro));
    
        if (!this.registros.every(registro => registro.valid)) {
            alert('Por favor complete todos los campos de todos los formularios.');
            return;
        }
    
        // Verificar que no haya campos vacíos en los formularios
        for (const registro of this.registros) {
            for (const control in registro.controls) {
                if (registro.get(control)?.value === '') {
                    alert('Por favor complete todos los campos de todos los formularios.');
                    return;
                }
            }
        }
    
        const centroCosto = this.formFijo.get('centroCosto')!.value;
        const centroOperacion = this.formFijo.get('centroOperacion')!.value;
        const puntoServicio = this.formFijo.get('puntoServicio')!.value;
    
        const horasExtrasData = this.registros.map(registro => ({
            NumeroDocumento: registro.get('NumeroDocumento')!.value,
            PrimerApellido: registro.get('PrimerApellido')!.value || null,
            SegundoApellido: registro.get('SegundoApellido')!.value || null,
            Nombre: registro.get('Nombre')!.value || null,
            FechaHoExt: registro.get('FechaHoExt')!.value,
            ID_TipoHoraExtra: registro.get('ID_TipoHoraExtra')!.value,
            NumeroHoras: Number(registro.get('NumeroHoras')!.value),
            Motivo: registro.get('Motivo')!.value,
            FormaPago: registro.get('FormaPago')!.value,
            HorarioHabitual: `${registro.get('HorarioHabitualDesdeHora')!.value}:${registro.get('HorarioHabitualDesdeMinuto')!.value} ${registro.get('HorarioHabitualDesdeAMPM')!.value} - ${registro.get('HorarioHabitualHastaHora')!.value}:${registro.get('HorarioHabitualHastaMinuto')!.value} ${registro.get('HorarioHabitualHastaAMPM')!.value}`,
            HoraEntrada: registro.get('HoraEntrada')!.value,
            HoraSalida: registro.get('HoraSalida')!.value,
            TiempoAlimentacion: `${registro.get('TiempoAlimentacionDesdeHora')!.value}:${registro.get('TiempoAlimentacionDesdeMinuto')!.value} ${registro.get('TiempoAlimentacionDesdeAMPM')!.value} - ${registro.get('TiempoAlimentacionHastaHora')!.value}:${registro.get('TiempoAlimentacionHastaMinuto')!.value} ${registro.get('TiempoAlimentacionHastaAMPM')!.value}`,
            CentroCosto: centroCosto,
            CentroOperacion: centroOperacion,
            PuntoServicio: puntoServicio
        }));
    
        this.horasExtraService.createBulk(horasExtrasData).subscribe(
            response => {
                alert('¡Registros guardados exitosamente!');
                this.registros = [];
                this.addRegistro();
                this.formFijo.reset();
            },
            error => {
                console.error('Error al guardar registros:', error);
                alert('Error al guardar registros');
            }
        );
    }
    
}
