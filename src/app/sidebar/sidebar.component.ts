import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { RolesService } from "../services/roles.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>Cafeteria Lolalatte</h2>
      </div>
      <ul class="nav-links">
        <li>
          <a routerLink="/attendance" routerLinkActive="active" class="nav-link">
            Registro de Asistencia
          </a>
        </li>
        <li *ngIf="canShowMenuItem([3, 4])">
          <a routerLink="/records" routerLinkActive="active" class="nav-link">
            Ver Asistencias
          </a>
        </li>
        <li class="has-submenu" [class.open]="isSettingsOpen" *ngIf="canShowMenuItem([4])">
          <a class="nav-link submenu-toggle" (click)="toggleSettings()">
            Configuración
            <i class="fas" [class.fa-chevron-down]="!isSettingsOpen" [class.fa-chevron-up]="isSettingsOpen"></i>
          </a>
          <ul class="submenu">
            <li><a class="nav-link" routerLink="/settings/company" routerLinkActive="active">Información Empresarial</a></li>
            <li><a class="nav-link" routerLink="/settings/shifts" routerLinkActive="active">Horarios</a></li>
            <li class="has-submenu" [class.open]="isPersonalOpen">
              <a class="nav-link submenu-toggle" (click)="togglePersonal($event)">
                Personal
                <i class="fas" [class.fa-chevron-down]="!isPersonalOpen" [class.fa-chevron-up]="isPersonalOpen"></i>
              </a>
              <ul class="submenu">
                <li><a class="nav-link" routerLink="/settings/employees" routerLinkActive="active">Empleados</a></li>
                <li><a class="nav-link" routerLink="/settings/roles" routerLinkActive="active">Roles</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="logout">
          <a (click)="onLogout()" class="nav-link">
            <i class="fas fa-door-open"></i> Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ["./sidebar.styles.css"],
})
export class SidebarComponent {
  isSettingsOpen = false;
  isPersonalOpen = false;  // Nuevo control para Personal

  constructor(
    private authService: AuthService, 
    private router: Router,
    private rolesService: RolesService
  ) {}

  toggleSettings(): void {
    this.isSettingsOpen = !this.isSettingsOpen;
    if (!this.isSettingsOpen) {
      this.isPersonalOpen = false;
    }
  }

  togglePersonal(event: Event): void {
    event.stopPropagation();  // Evita que el click se propague
    this.isPersonalOpen = !this.isPersonalOpen;
  }

  canShowMenuItem(requiredRoles: number[]): boolean {
    const hasAccess = this.rolesService.hasRole(requiredRoles);
    console.log(`Acceso a menú ${requiredRoles}: ${hasAccess}`);
    return hasAccess;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
