import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PuntoServicio } from '../models/puntoServicio';

@Injectable({
  providedIn: 'root'
})
export class PuntoServicioService {
  private apiUrl = 'http://localhost:3000/puntoServicio'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  getPuntosServicio(puntoServicio: string): Observable<PuntoServicio[]> {
    return this.http.get<PuntoServicio[]>(this.apiUrl);
  }
}
