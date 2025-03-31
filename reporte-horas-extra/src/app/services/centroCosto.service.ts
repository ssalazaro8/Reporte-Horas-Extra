import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentroCosto } from '../models/centroCosto';

@Injectable({
  providedIn: 'root'
})
export class CentroCostoService {
  [x: string]: any;
  private apiUrl = 'http://localhost:3000/centroCosto'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  getCentrosCosto(): Observable<CentroCosto[]> {
    return this.http.get<CentroCosto[]>(this.apiUrl);
  }
}
