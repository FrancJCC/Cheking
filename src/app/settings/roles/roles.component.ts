import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../interfaces/roles.interface';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../services/shared/alert.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  standalone: true,
  imports: [CommonModule, AddRolesComponent, EditRoleComponent]
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  loading = false;
  errorMessage = '';
  showSuccessMessage = false;
  showModal = false;
  selectedRoleId?: number;

  constructor(
    private rolesService: RolesService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.errorMessage = '';
    this.rolesService.getRoles().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.roles = response.data;
        } else {
          this.errorMessage = 'Error al cargar los roles';
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar los roles';
        this.loading = false;
      }
    });
  }

  addRole(): void {
    this.selectedRoleId = undefined;
    this.showModal = true;
  }

  handleModalClose(refresh: boolean): void {
    this.showModal = false;
    if (refresh) {
      this.loadRoles();
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
    }
  }

  editRole(id: number): void {
    this.selectedRoleId = id;
    this.showModal = true;
  }

  // Remove this line
  showDeleteModal = false;

  deleteRole(id: number): void {
    this.alertService.showDeleteConfirmation('¿Está seguro que desea eliminar este rol?').then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.rolesService.deleteRole(id).subscribe({
          next: () => {
            this.loadRoles();
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
      }
    });
  }
}