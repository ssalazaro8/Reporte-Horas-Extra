import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleados'; // Asegúrate de tener este modelo definido

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private baseUrl = 'http://localhost:3000/empleados'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los empleados
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.baseUrl);
  }

  // Obtener un empleado por su número de documento
  getEmpleadoPorDocumento(numeroDocumento: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.baseUrl}/${numeroDocumento}`);
  }

  // Crear un nuevo empleado
  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.baseUrl, empleado);
  }

  // Actualizar un empleado existente
  updateEmpleado(numeroDocumento: string, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.baseUrl}/${numeroDocumento}`, empleado);
  }

  // Eliminar un empleado
  deleteEmpleado(numeroDocumento: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${numeroDocumento}`);
  }
}
