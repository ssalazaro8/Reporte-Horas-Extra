import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoHoraExtra } from '../models/tipoHoraExtra';

@Injectable({
  providedIn: 'root'
})
export class TipoHoraExtraService {
  private apiUrl = 'http://localhost:3000/tipoHE'; // Reemplázala con la URL correcta

  constructor(private http: HttpClient) {}

  getTiposHoraExtras(): Observable<TipoHoraExtra[]> {
    return this.http.get<TipoHoraExtra[]>(this.apiUrl);
  }
}
