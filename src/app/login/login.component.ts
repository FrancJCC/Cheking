import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service"; // Importa el servicio
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  styleUrls: ["./login.styles.css"], // Vincula el archivo CSS específico
  imports: [CommonModule, ReactiveFormsModule], // Agrega HttpClientModule
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2 class="page-title">Iniciar sesión</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="username">Usuario:</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              placeholder="Ingresa tu usuario"
            />
            <div
              *ngIf="
                loginForm.get('username')?.invalid &&
                loginForm.get('username')?.touched
              "
              class="error-message"
            >
              El usuario es obligatorio.
            </div>
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder="Ingresa tu contraseña"
            />
            <div
              *ngIf="
                loginForm.get('password')?.invalid &&
                loginForm.get('password')?.touched
              "
              class="error-message"
            >
              La contraseña es obligatoria.
            </div>
          </div>
          <button type="submit" [disabled]="isLoading" class="btn btn-primary">
            {{ isLoading ? "Cargando..." : "Iniciar sesión" }}
          </button>
          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  // login.component.ts
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/attendance"]); // Redirige si ya está autenticado
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(["/attendance"]); // Redirige al dashboard después de iniciar sesión
        },
        error: (err) => {
          this.errorMessage = err.message || "Ocurrió un error,el usuario o la contraseña estan mal";
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = "Por favor, completa todos los campos.";
    }
  }
}
