import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showSuccess(message: string) {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
      showConfirmButton: false
    });
  }

  showError(message: string) {
    Swal.fire({
      title: '¡Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#dc3545'
    });
  }

  showWarning(message: string) {
    Swal.fire({
      title: '¡Aviso!',
      text: message,
      icon: 'warning',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#ffc107'
    });
  }

  showDeleteConfirmation(message: string) {
      return Swal.fire({
        title: '¿Está seguro?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d'
      });
    }
}