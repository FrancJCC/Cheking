import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from './shared/alert.service';
import { ApiResponse, Shifts } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  getShifts(): Observable<ApiResponse<Shifts[]>> {
    return this.http.get<ApiResponse<Shifts[]>>(environment.endpoints.shifts).pipe(
      catchError(error => {
        this.alertService.showError('Error al cargar los turnos');
        return throwError(() => error);
      })
    );
  }

  getShift(id: number): Observable<ApiResponse<Shifts>> {
    return this.http.get<ApiResponse<Shifts>>(`${environment.endpoints.shifts}?id=${id}`).pipe(
      catchError(error => {
        this.alertService.showError('Error al cargar el turno');
        return throwError(() => error);
      })
    );
  }

  addShift(shift: Omit<Shifts, 'id'>): Observable<ApiResponse<Shifts>> {
    return this.http.post<ApiResponse<Shifts>>(environment.endpoints.shifts, shift).pipe(
      tap(() => this.alertService.showSuccess('Turno creado correctamente')),
      catchError(error => {
        this.alertService.showError('Error al crear el turno');
        return throwError(() => error);
      })
    );
  }

  updateShift(shift: Shifts): Observable<ApiResponse<Shifts>> {
    return this.http.put<ApiResponse<Shifts>>(environment.endpoints.shifts, shift).pipe(
      tap(() => this.alertService.showSuccess('Turno actualizado correctamente')),
      catchError(error => {
        this.alertService.showError('Error al actualizar el turno');
        return throwError(() => error);
      })
    );
  }

  deleteShift(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.endpoints.shifts}?id=${id}`).pipe(
      tap(() => this.alertService.showSuccess('Turno eliminado correctamente')),
      catchError(error => {
        this.alertService.showError('Error al eliminar el turno');
        return throwError(() => error);
      })
    );
  }
}