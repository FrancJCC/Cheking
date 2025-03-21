import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
import { AlertService } from './shared/alert.service';
import { StorageService } from './shared/storage.service';
import { User, LoginResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private alertService: AlertService,
    private storageService: StorageService
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<LoginResponse>(environment.endpoints.login, { username, password }, { headers })
      .pipe(
        tap((response) => {
          if (response.success) {
            this.storageService.setUser(response.user);
            this.isAuthenticatedSubject.next(true);
            this.router.navigate(["/attendance"]);
          } else {
            this.alertService.showError("Credenciales incorrectas");
            throw new Error("Credenciales incorrectas");
          }
        }),
        catchError((error) => {
          console.error("Error during login:", error);
          this.alertService.showError("Credenciales incorrectas o error del servidor");
          return throwError(() => new Error("Credenciales incorrectas o error del servidor"));
        })
      );
  }

  logout(): void {
    this.storageService.removeUser();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    return this.storageService.hasUser();
  }

  getCurrentUser(): User | null {
    return this.storageService.getUser();
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
