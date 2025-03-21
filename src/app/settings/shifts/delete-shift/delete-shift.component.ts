import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShiftsService } from '../../../services/shifts.service';
import { Shifts, ApiResponse } from '../../../interfaces/api.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-shift',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-shift.component.html',
  styleUrls: ['./delete-shift.component.css']
})
export class DeleteShiftComponent implements OnInit {
  shift: Shifts = {
    id: 0,
    name: '',
    start_time: '',
    end_time: ''
  };
  loading = true;
  errorMessage = '';

  constructor(
    private shiftsService: ShiftsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadShift(id);
  }

  loadShift(id: number): void {
    this.shiftsService.getShift(id).subscribe({
      next: (response: ApiResponse<Shifts>) => {
        if (response.success) {
          this.shift = response.data;
        } else {
          this.showErrorAlert(response.message || 'Error al cargar el turno');
        }
        this.loading = false;
      },
      error: (error: unknown) => {
        console.error('Error al cargar el turno:', error);
        this.showErrorAlert('Error al cargar el turno');
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
      console.error('Error al formatear hora:', e);
      return time;
    }
  }

  private showSuccessAlert(message: string) {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
      showConfirmButton: false
    });
  }

  private showErrorAlert(message: string) {
    Swal.fire({
      title: '¡Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  deleteShift(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.isConfirmed) {
        this.shiftsService.deleteShift(this.shift.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.showSuccessAlert('Turno eliminado correctamente');
              this.router.navigate(['/settings/shifts']);
            } else {
              this.showErrorAlert(response.message || 'Error al eliminar el turno');
            }
          },
          error: (error: unknown) => {
            console.error('Error al eliminar el turno:', error);
            this.showErrorAlert('Error al eliminar el turno');
          }
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/settings/shifts']);
  }
}