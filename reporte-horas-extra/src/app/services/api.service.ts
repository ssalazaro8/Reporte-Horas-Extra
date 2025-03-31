import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'; // URL base del servidor

  constructor(private http: HttpClient) { }

  post(url: string, body: any): Observable<any> {
    if (url.startsWith('http')) {
      return this.http.post(url, body); // Si la URL es absoluta, no se agrega la base
    } else {
      return this.http.post(`${this.apiUrl}/${url}`, body); // Si no es absoluta, se agrega la base
    }
  }
}
