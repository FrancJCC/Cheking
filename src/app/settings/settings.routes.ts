import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { CompanyComponent } from './company/company.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { AddShiftComponent } from './shifts/add-shift/add-shift.component';
import { EditShiftComponent } from './shifts/edit-shift/edit-shift.component';
import { DeleteShiftComponent } from './shifts/delete-shift/delete-shift.component';
import { RolesComponent } from './roles/roles.component';
import { AddRolesComponent } from './roles/add-roles/add-roles.component';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'company', pathMatch: 'full' },
      { path: 'company', component: CompanyComponent },
      { path: 'shifts', component: ShiftsComponent },
      { path: 'shifts/add', component: AddShiftComponent },
      { path: 'shifts/edit/:id', component: EditShiftComponent },
      { path: 'shifts/delete/:id', component: DeleteShiftComponent },
      { path: 'roles', component: RolesComponent},
      { path: 'roles/add', component: AddRolesComponent},
    ]
  }
];