import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsService } from '../../services/shifts.service';
import { Shifts } from '../../interfaces/api.interface';
import { EditShiftComponent } from './edit-shift/edit-shift.component';
import { AlertService } from '../../services/shared/alert.service';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [CommonModule, EditShiftComponent],
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {
  shifts: Shifts[] = [];
  loading = false;
  errorMessage = '';
  showSuccessMessage = false;
  showModal = false;
  selectedShiftId?: number;

  constructor(
    private ShiftsService: ShiftsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadShifts();
  }

  loadShifts(): void {
    this.loading = true;
    this.ShiftsService.getShifts().subscribe({
      next: (response) => {
        if (response.success) {
          this.shifts = response.data;
        } else {
          this.errorMessage = 'Error al cargar los turnos';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading shifts:', error);
        this.errorMessage = 'Error al cargar los turnos';
        this.loading = false;
      }
    });
  }

  formatTimeToAMPM(time: string): string {
    if (!time) return '';
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch (e) {
      return time;
    }
  }

  addShift(): void {
    this.selectedShiftId = undefined;
    this.showModal = true;
  }

  editShift(id: number): void {
    this.selectedShiftId = id;
    this.showModal = true;
  }

  deleteShift(id: number): void {
    this.alertService.showDeleteConfirmation('¿Está seguro que desea eliminar este turno?').then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.ShiftsService.deleteShift(id).subscribe({
          next: () => {
            this.loadShifts();
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
      }
    });
  }

  handleModalClose(refresh: boolean): void {
    this.showModal = false;
    if (refresh) {
      this.loadShifts();
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
    }
  }
}