import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AttendanceService } from "../services/auth.service";
import { AuthService } from "../services/auth.service"; // Correcto (si está en el mismo archivo)

@Component({
  selector: "app-attendance",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1 class="page-title">LolaLatte</h1>
      <p class="welcome-message">
        Ingresa tu matrícula para registrar asistencia
      </p>
      <div class="card">
        <div class="form-group">
          <label for="matricula">Matrícula:</label>
          <input
            type="text"
            id="matricula"
            [(ngModel)]="username"
            name="username"
            placeholder="Ej: EMP-000"
            autocomplete="off"
          />
        </div>
        <button
          (click)="registerAttendance()"
          class="btn btn-primary"
          [disabled]="!user?.id"
        >
          Registrar Asistencia
        </button>
        <p>
        <button (click)="logout()" class="btn btn-primary">
          Cerrar Sesión
        </button>

        <!-- Muestra datos del empleado -->

        <div *ngIf="lastRegistration" class="mt-3">
          <h3>¡Registro Exitoso!</h3>
          <p><strong>Nombre:</strong> {{ lastRegistration.name }}</p>
          <p><strong>Matrícula:</strong> {{ lastRegistration.username }}</p>
          <p>
            <strong>Fecha:</strong>
            {{ lastRegistration.timestamp | date : "medium" }}
          </p>
        </div>
      </div>
    </div>

    <div *ngIf="!user?.id" class="alert alert-warning">
      Debes iniciar sesión para registrar asistencia
    </div>
  `,
})
export class AttendanceComponent {
  user: any = {}; // Inicializa como objeto vacío
  username: string = "";
  lastRegistration: any = null;

  constructor(
    private authService: AuthService,
    private attendanceService: AttendanceService
  ) {
    const storedUser = localStorage.getItem("user");
    this.user = storedUser ? JSON.parse(storedUser) : {};
  }

  logout() {
    this.authService.logout();
  }

  registerAttendance() {
    if (!this.user?.id) {
      console.error("Usuario no autenticado");
      return;
    }

    this.attendanceService.registerAttendance(this.user.id).subscribe({
      next: (response) => {
        this.lastRegistration = response.data; // Respuesta del backend
        console.log("Asistencia registrada:", response);
      },
      error: (err) => {
        console.error("Error al registrar asistencia:", err);
      },
    });
  }
}
