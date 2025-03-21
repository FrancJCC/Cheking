import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShiftsService } from '../../../services/shifts.service';
import { Shifts } from '../../../interfaces/api.interface';

@Component({
  selector: 'app-edit-shift',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.css']
})
export class EditShiftComponent implements OnInit {
  @Input() shiftId?: number;
  @Output() closeModal = new EventEmitter<boolean>();

  shift: Shifts = {
    id: 0,
    name: '',
    start_time: '',
    end_time: ''
  };
  
  loading = false;
  errorMessage = '';
  isEditing = false;

  constructor(private shiftsService: ShiftsService) {}

  ngOnInit(): void {
    if (this.shiftId) {
      this.isEditing = true;
      this.loadShift(this.shiftId);
    }
  }

  loadShift(id: number): void {
    this.loading = true;
    this.shiftsService.getShift(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.shift = response.data;
        } else {
          this.errorMessage = 'No se pudo cargar el turno';
        }
        this.loading = false;
      },
      error: (error: unknown) => {
        console.error('Error loading shift:', error);
        this.errorMessage = 'Error al cargar el turno';
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

  validateTimes(): boolean {
    if (!this.shift.start_time || !this.shift.end_time) return false;
    
    const start = new Date(`2000/01/01 ${this.shift.start_time}`);
    const end = new Date(`2000/01/01 ${this.shift.end_time}`);
    
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    
    return true;
  }

  isValidTimeRange(): boolean {
    return this.validateTimes() && !!this.shift.name;
  }

  cancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (!this.isValidTimeRange()) {
      this.errorMessage = 'Por favor complete todos los campos correctamente';
      return;
    }

    const operation = this.isEditing ?
      this.shiftsService.updateShift(this.shift) :
      this.shiftsService.addShift(this.shift);

    operation.subscribe({
      next: (response) => {
        if (response.success) {
          this.closeModal.emit(true);
        } else {
          this.errorMessage = response.message || 'Error al guardar el turno';
        }
      },
      error: (error: unknown) => {
        console.error('Error saving shift:', error);
        this.errorMessage = 'Error al guardar el turno';
      }
    });
  }
}