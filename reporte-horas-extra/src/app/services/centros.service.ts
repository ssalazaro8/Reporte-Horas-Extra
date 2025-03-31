// centros.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Centro } from '../models/centros';

@Injectable({
    providedIn: 'root',
})
export class CentrosService {
    private apiUrl = 'http://localhost:3000/centros'; // Cambia la URL según tu configuración

    constructor(private http: HttpClient) {}

    getCentros(): Observable<Centro[]> {
        return this.http.get<Centro[]>(this.apiUrl);
    }
}