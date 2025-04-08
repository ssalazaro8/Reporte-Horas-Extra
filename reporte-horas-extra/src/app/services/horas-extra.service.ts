import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { HorasExtra } from '../models/horasExtra';

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

  getFilteredRegistros(puntoServicio: string, fechaDesde: string, fechaHasta: string): Observable<any[]> {
    // Validación básica
    if (!puntoServicio) {
        return of([]);
    }
    
    let params = new HttpParams()
        .set('puntoServicio', puntoServicio);
    
    if (fechaDesde) {
        params = params.set('fechaDesde', fechaDesde);
    }
    
    if (fechaHasta) {
        params = params.set('fechaHasta', fechaHasta);
    }
    
    return this.httpClient.get<any[]>(this.baseUrl, { params }).pipe(
        tap(response => console.log('Respuesta del backend:', response)),
        catchError((error: HttpErrorResponse) => {
            console.error('Error en la solicitud:', {
                url: error.url,
                status: error.status,
                error: error.error
            });
            return of([]);
        })
    );
}

updateRegistro(registro: HorasExtra): Observable<any> {
  // Formatear fecha para SQL Server 2008
  const payload = {
      ...registro,
      FechaHoExt: registro.FechaHoExt ? 
          new Date(registro.FechaHoExt).toISOString().split('T')[0] : 
          null
  };

  return this.httpClient.put(`${this.baseUrl}/${registro.ID_HoraExtra}`, payload).pipe(
      catchError((error) => {
          console.error('Error completo:', error);
          return throwError(() => new Error(error.message || 'Error al actualizar'));
      })
  );
}

  deleteRegistro(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}

