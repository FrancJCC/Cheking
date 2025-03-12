// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://apicheking.atwebpages.com/api/';

  constructor(
    private http: HttpClient,
    private router: Router // Agregamos Router
  ) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}login.php`, { username, password }, { headers });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Verificar si hay sesión activa
  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://apicheking.atwebpages.com/api/';

  constructor(private http: HttpClient) {}

  // Ahora recibe user_id en lugar de username
  getEmployeeInfo(user_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}employee.php?id=${user_id}`);
  }

  // Ahora envía user_id en lugar de username
  registerAttendance(user_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}attendance.php`, { user_id });
  }
}
