import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorasExtraService {
  private baseUrl = 'http://localhost:3000/horas-extra';

  constructor(private httpClient: HttpClient) { }

  createBulk(horasExtrasData: any[]): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/bulk`, horasExtrasData);
  }

  getAllRegistros(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener registros:', error);
        return of([]);
      })
    );
  }

  getFilteredRegistros(puntoServicio: string, fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl, {
      params: {
        puntoServicio,
        fechaDesde: fechaInicio,
        fechaHasta: fechaFin
      }
    });
  }

  updateRegistro(registro: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${registro.ID_HoraExtra}`, registro).pipe(
        catchError((error) => {
            console.error('Error al actualizar el registro:', error);
            return throwError(() => new Error('Error al actualizar el registro'));
        })
    );
}


  deleteRegistro(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
