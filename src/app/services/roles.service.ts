import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from './shared/alert.service';
import { ApiResponse } from '../interfaces/api.interface';
import { Role } from '../interfaces/roles.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  getRoles(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(environment.endpoints.roles).pipe(
      catchError(error => {
        this.alertService.showError('Error al cargar los roles');
        return throwError(() => error);
      })
    );
  }

  getRole(id: number): Observable<ApiResponse<Role>> {
    return this.http.get<ApiResponse<Role>>(`${environment.endpoints.roles}?id=${id}`).pipe(
      catchError(error => {
        this.alertService.showError('Error al cargar el rol');
        return throwError(() => error);
      })
    );
  }

  addRole(role: Omit<Role, 'id'>): Observable<ApiResponse<Role>> {
    return this.http.post<ApiResponse<Role>>(environment.endpoints.roles, role).pipe(
      tap(() => this.alertService.showSuccess('Rol creado correctamente')),
      catchError(error => {
        this.alertService.showError('Error al crear el rol');
        return throwError(() => error);
      })
    );
  }

  updateRole(role: Role): Observable<ApiResponse<Role>> {
    return this.http.put<ApiResponse<Role>>(environment.endpoints.roles, role).pipe(
      tap(() => this.alertService.showSuccess('Rol actualizado correctamente')),
      catchError(error => {
        this.alertService.showError('Error al actualizar el rol');
        return throwError(() => error);
      })
    );
  }

  deleteRole(id: number): Observable<ApiResponse<void>> {
    const options = {
      body: { id }
    };
    return this.http.delete<ApiResponse<void>>(environment.endpoints.roles, options).pipe(
      catchError(error => {
        this.alertService.showError('Error al eliminar el rol');
        return throwError(() => error);
      })
    );
  }

  getUserRole(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // Mapear el nombre del rol a su ID correspondiente
    const roleMap: { [key: string]: number } = {
      'Admin': 4,
      'Supervisor': 3,
      'Employee': 2
    };
    
    return user.role ? roleMap[user.role] || 0 : 0;
  }

  hasRole(allowedRoles: number[]): boolean {
    const userRole = this.getUserRole();
    console.log('Role actual:', userRole);
    return allowedRoles.includes(userRole);
  }
}