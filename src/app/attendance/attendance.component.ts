import { Component } from '@angular/core';
import { AttendanceService } from '../services/attendance.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service"; // Correcto (si está en el mismo archivo)

@Component({
  selector: "app-attendance",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1 class="page-title">LolaLatte</h1>
      <div class="card">
      <p class="welcome-message">
        Ingresa tu matrícula para registrar asistencia
      </p>
        <div class="form-group">
          <label for="matricula">Matrícula:</label>
          <input
            type="text"
            id="matricula"
            [(ngModel)]="enteredUsername"
            name="username"
            placeholder="Ej: EMP-000"
            autocomplete="off"
          />
        </div>
        <button
          (click)="registerAttendance()"
          class="btn btn-primary"
          [disabled]="!user?.id || !enteredUsername.trim()"
        >
          Registrar Asistencia
        </button>
        <p>


          <!-- Muestra datos del empleado -->
        </p>

        <div *ngIf="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>

        <div *ngIf="lastRegistration" class="mt-3">
          <h3>¡Registro Exitoso!</h3>
          <p><strong>Nombre:</strong> {{ lastRegistration.name }}</p>
          <p><strong>Turno:</strong> {{ lastRegistration.shift }}</p>
          <p>
            <strong>Hora:</strong>
            {{ lastRegistration.timestamp | date : "medium" }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class AttendanceComponent {
  user: any = {}; // Inicializa como objeto vacío
  username: string = "";
  enteredUsername: string = "";
  lastRegistration: any = null;
  errorMessage: string = ""; // Declara la propiedad

  constructor(
    private authService: AuthService,
    private attendanceService: AttendanceService
  ) {
    const storedUser = localStorage.getItem("user");
    this.user = storedUser ? JSON.parse(storedUser) : {};
    console.log("Usuario cargado:", this.user); // Depura el usuario
  }
  registerAttendance() {
    if (!this.user?.id) {
      console.error("Usuario no autenticado");
      return;
    }

    // Validar que el username ingresado coincida con el almacenado
    if (this.enteredUsername !== this.user.username) {
      this.errorMessage =
        "La matrícula ingresada no coincide con la sesión actual";
      return;
    }

    // Limpiar mensajes previos
    this.errorMessage = "";
    this.attendanceService.registerAttendance(this.user.id).subscribe({
      next: (response) => {
        console.log("Respuesta del backend:", response);

        if (response.success && response.data) {
          // Asigna los datos si el registro fue exitoso
          this.lastRegistration = response.data;
        } else {
          // Muestra el mensaje del backend si no fue exitoso
          this.errorMessage = response.message || "";
          this.lastRegistration = null; // Limpia el último registro
        }
      },
      error: (err) => {
        console.error("Error del backend:", err);
        this.errorMessage = err.error?.message || "";
        this.lastRegistration = null; // Limpia el último registro
      },
    });
  }
}
