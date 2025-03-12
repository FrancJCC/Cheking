import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service"; // Importa el servicio
import { HttpClientModule } from "@angular/common/http";
// Importa HttpClientModule

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Agrega HttpClientModule
  template: `
    <div class="container">
      <div class="card login-card">
        <h1 class="page-title">Cafeteria LolaLatte</h1>
        <p class="welcome-message">
          Bienvenida al sistema de administración.<br />
          Por favor, ingresa tus credenciales para continuar.
        </p>
        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="username">Usuario:</label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              placeholder="Ingresa tu usuario"
              autocomplete="off"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="isLoading">
            {{ isLoading ? "Cargando..." : "Iniciar Sesión" }}
          </button>
        </form>
        <div *ngIf="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  isLoading: boolean = false;
  errorMessage: string = "";

  constructor(
    private router: Router,
    private authService: AuthService // Inyecta el servicio
  ) {}

  // login.component.ts
  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.user)); // Guarda el usuario
          this.router.navigate(['/attendance']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
