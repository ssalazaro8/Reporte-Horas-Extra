import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/usuarios';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  showWelcomeMessage = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.loading) return;

    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (user: User) => this.handleLoginSuccess(user),
      error: (error: Error) => this.handleLoginError(error),
      complete: () => this.loading = false
    });
  }

  private handleLoginSuccess(user: User): void {
    this.showWelcomeMessage = true;

    timer(3000).subscribe(() => {
      this.showWelcomeMessage = false;
      const redirectMap: { [key: number]: string } = {
        2: '/empleados',
        3: '/generar',
        4: '/revision',
        5: '/consultar'
      };

      const redirectUrl = redirectMap[user.ID_Rol] || '/homeRegistros';
      this.router.navigate([redirectUrl], { replaceUrl: true });
    });
  }

  private handleLoginError(error: Error): void {
    this.errorMessage = error.message;
    this.loading = false;
  }
}
