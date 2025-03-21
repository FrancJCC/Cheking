import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { tap, catchError, map, switchMap } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { AlertService } from './shared/alert.service';

@Injectable({
  providedIn: "root",
})
export class AttendanceService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  getEmployeeInfo(user_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}employee.php?id=${user_id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener información del empleado:', error);
        this.alertService.showError('Error al obtener información del empleado');
        return throwError(() => new Error('Error al obtener información del empleado'));
      })
    );
  }

  private checkDailyAttendance(user_id: number): Observable<boolean> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<any>(`${this.apiUrl}attendance.php?user_id=${user_id}&date=${today}&check=true`).pipe(
      map(response => response.exists || false),
      catchError(() => of(false))
    );
  }

  registerAttendance(user_id: number): Observable<any> {
    console.log("Verificando asistencia para user_id:", user_id);
    
    return this.checkDailyAttendance(user_id).pipe(
      switchMap(exists => {
        if (exists) {
          this.alertService.showWarning('Ya registraste tu asistencia hoy. Solo se permite un registro por día.');
          return throwError(() => new Error('Ya existe un registro de asistencia para hoy'));
        }

        return this.http.post(
          environment.endpoints.attendance,
          { user_id },
          { headers: { "Content-Type": "application/json" } }
        ).pipe(
          tap((response: any) => {
            if (response.success) {
              this.alertService.showSuccess('Asistencia registrada correctamente');
            } else {
              this.alertService.showError(response.message || 'Error al registrar asistencia');
            }
          })
        );
      }),
      catchError((error) => {
        if (error.message === 'Ya existe un registro de asistencia para hoy') {
          return throwError(() => error);
        }
        console.error('Error al registrar asistencia:', error);
        this.alertService.showError('Error al registrar la asistencia');
        return throwError(() => new Error('Error al registrar la asistencia'));
      })
    );
  }

  getAttendanceRecords(): Observable<any> {
    return this.http.get(`${this.apiUrl}/attendance-records.php`).pipe(
      catchError((error) => {
        console.error('Error al obtener registros de asistencia:', error);
        this.alertService.showError('Error al cargar los registros de asistencia');
        return throwError(() => new Error('Error al obtener registros de asistencia'));
      })
    );
  }
}