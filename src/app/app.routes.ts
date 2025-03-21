import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { RecordsComponent } from './records/records.component';
import { AuthGuard } from "./services/auth.guard";
import { SETTINGS_ROUTES } from './settings/settings.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard],  // Employee, Supervisor, Admin
  },
  {
    path: 'settings',
    children: SETTINGS_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: "records",
    component: RecordsComponent,
    canActivate: [AuthGuard],
  },
];
