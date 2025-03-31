import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/usuarios';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  constructor(private apiService: ApiService, private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user') || 'null')
    );
    this.user$ = this.userSubject.asObservable();

    // Escuchar eventos de almacenamiento entre pestañas
    window.addEventListener('storage', (event) => {
      if (event.key === 'user' && !event.newValue) {
        this.logout();
      }
    });
  }

  login(email: string, password: string): Observable<User> {
    return this.apiService.post('auth/login', { Email: email, Contrasena: password }).pipe(
      map(response => {
        const user = response.user;
        const token = response.access_token;
        
        if (!user || !token) {
          throw new Error('Respuesta de autenticación inválida');
        }

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        
        return user;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido';
        if (error.status === 401) {
          errorMessage = 'Credenciales inválidas';
        } else if (error.status >= 500) {
          errorMessage = 'Error del servidor';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/'], { 
      replaceUrl: true,
      queryParams: { sessionEnded: true }
    });
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getRole(): number | null {
    return this.userSubject.value?.ID_Rol || null;
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }
}
