import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../models/empleados';
import { CommonModule } from '@angular/common';
import { NavbarRegistrosComponent } from "../navbar-registros/navbar-registros.component";

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarRegistrosComponent],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent {
  empleado: Empleado | null = null;
  empleadoForm!: FormGroup;
  searchForm!: FormGroup;
  isEditing = false;
  showSearch = false;
  showCreateForm = false;

  constructor(private fb: FormBuilder, private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      NumeroDocumento: ['', Validators.required],
      Nombres: ['', Validators.required],
      PrimerApellido: ['', Validators.required],
      SegundoApellido: ['', Validators.required],
    });

    this.searchForm = this.fb.group({
      NumeroDocumento: ['', Validators.required]
    });
  }

  searchEmpleado(): void {
    const numeroDocumento = this.searchForm.get('NumeroDocumento')!.value;
    this.empleadosService.getEmpleadoPorDocumento(numeroDocumento).subscribe((data) => {
      this.empleado = data;
      this.showSearch = false; // Oculta el formulario de búsqueda
    });
  }

  onSubmit(): void {
    const formValue = this.empleadoForm.value;

    if (this.isEditing) {
      // Actualizar empleado
      this.empleadosService.updateEmpleado(formValue.NumeroDocumento, formValue).subscribe(() => {
        alert('Empleado actualizado');
        this.resetForm();
        this.showCreateForm = false; // Oculta el formulario de edición
      });
    } else {
      // Crear empleado
      this.empleadosService.createEmpleado(formValue).subscribe(() => {
        alert('Empleado creado');
        this.resetForm();
        this.showCreateForm = false; // Oculta el formulario de creación
      });
    }
  }


editEmpleado(empleado: Empleado): void {
  this.isEditing = true;
  this.empleadoForm.patchValue(empleado);
  this.showCreateForm = true; // Muestra el formulario de edición
}


  deleteEmpleado(numeroDocumento: string): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadosService.deleteEmpleado(numeroDocumento).subscribe(() => {
        alert('Empleado eliminado');
        this.empleado = null; // Limpia la vista
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.empleadoForm.reset();
  }

  toggleSearch(): void {
    this.showCreateForm = false; // Oculta el formulario de creación
    this.showSearch = true;
  }

  toggleCreateForm(): void {
    this.showSearch = false; // Oculta el formulario de búsqueda
    this.showCreateForm = true;
  }
}
