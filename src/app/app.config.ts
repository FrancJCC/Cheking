import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AuthGuard } from './services/auth.guard';



//import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { 
        path: 'attendance', 
        component: AttendanceComponent,
        canActivate: [AuthGuard] 
    },
    { path: 'login', component: LoginComponent },
  ];
  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideHttpClient(),
      AuthGuard // ¡Añade esto!
    ]
  };