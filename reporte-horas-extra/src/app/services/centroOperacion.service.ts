import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentroOperacion } from '../models/centroOperacion';

@Injectable({
  providedIn: 'root'
})
export class CentroOperacionService {
  private apiUrl = 'http://localhost:3000/centroOperacion'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  getCentrosOperacion(): Observable<CentroOperacion[]> {
    return this.http.get<CentroOperacion[]>(this.apiUrl);
  }
}
