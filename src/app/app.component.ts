import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule], // Importa los componentes necesarios
  template: `
    <div class="app-container">
      <!-- Sidebar visible solo si showSidebar es true -->
      <app-sidebar *ngIf="showSidebar"></app-sidebar>
      <div [class.with-sidebar]="showSidebar">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        min-height: 100vh;
      }
      .with-sidebar {
        flex: 1;
        margin-left: var(--sidebar-width); /* Asegúrate de definir --sidebar-width en tus estilos globales */
      }
    `,
  ],
})
export class App {
  showSidebar = false;

  constructor(private router: Router, private authService: AuthService) {
    // Escucha cambios en las rutas
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Muestra el sidebar si el usuario está autenticado y no está en la página de login
        this.showSidebar =
          this.authService.isAuthenticated() && !event.url.includes('/login');
      });
  }
}