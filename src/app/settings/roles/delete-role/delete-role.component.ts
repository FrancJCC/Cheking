import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../services/roles.service';
import { AlertService } from '../../../services/shared/alert.service';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DeleteRoleComponent {
  @Input() roleId!: number;
  @Output() closeModal = new EventEmitter<boolean>();
  isDeleting = false;

  constructor(
    private rolesService: RolesService,
    private alertService: AlertService
  ) {}

  confirmDelete(): void {
    this.alertService.showDeleteConfirmation('¿Está seguro que desea eliminar este rol?').then((result) => {
      if (result.isConfirmed) {
        this.isDeleting = true;
        this.rolesService.deleteRole(this.roleId).subscribe({
          next: () => {
            this.alertService.showSuccess('Rol eliminado exitosamente');
            this.closeModal.emit(true);
          },
          error: (error) => {
            this.alertService.showError('Error al eliminar el rol');
            console.error('Error:', error);
          },
          complete: () => {
            this.isDeleting = false;
          }
        });
      }
    });
  }

  cancel(): void {
    this.closeModal.emit(false);
  }
}