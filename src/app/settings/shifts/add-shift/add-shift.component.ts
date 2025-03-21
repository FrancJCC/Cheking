import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShiftsService } from '../../../services/shifts.service';
import { Shifts, ApiResponse } from '../../../interfaces/api.interface';
import { AlertService } from '../../../services/shared/alert.service';

@Component({
  selector: 'app-add-shift',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})
export class AddShiftComponent {
  shift: Omit<Shifts, 'id'> = {
    name: '',
    start_time: '',
    end_time: ''
  };
  errorMessage = '';

  constructor(
    private shiftsService: ShiftsService,
    private router: Router,
    private alertService: AlertService
  ) {}

  // Eliminamos los métodos showSuccessAlert y showErrorAlert ya que usaremos AlertService

  formatTimeToAMPM(time: string): string {
    if (!time) return '';
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch (e) {
      console.error('Error al formatear hora:', e);
      return time;
    }
  }

  isValidTimeRange(): boolean {
    if (!this.shift.start_time || !this.shift.end_time) return false;
    const [startHours, startMinutes] = this.shift.start_time.split(':').map(Number);
    const [endHours, endMinutes] = this.shift.end_time.split(':').map(Number);
    const startTime = startHours * 60 + startMinutes;
    const endTime = endHours * 60 + endMinutes;
    return startTime < endTime;
  }

  validateTimes(): void {
    if (!this.shift.start_time || !this.shift.end_time) {
      this.errorMessage = 'Por favor, completa ambos campos de hora.';
      return;
    }
    if (!this.isValidTimeRange()) {
      this.errorMessage = 'La hora de salida debe ser posterior a la hora de entrada';
      return;
    }
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.validateTimes();
    if (this.errorMessage) {
      this.alertService.showError(this.errorMessage);
      return;
    }

    const newShift = {
      ...this.shift,
      start_time: this.shift.start_time + ':00',
      end_time: this.shift.end_time + ':00'
    };

    this.shiftsService.addShift(newShift).subscribe({
      next: (response: ApiResponse<Shifts>) => {
        if (response.success) {
          this.alertService.showSuccess('Turno creado correctamente');
          this.router.navigate(['/settings/shifts']);
        } else {
          this.alertService.showError(response.message || 'Error al crear el turno');
        }
      },
      error: (error: unknown) => {
        console.error('Error al crear el turno:', error);
        this.alertService.showError('Error al crear el turno');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/settings/shifts']);
  }
}