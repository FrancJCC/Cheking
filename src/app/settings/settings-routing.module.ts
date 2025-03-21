import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { AddShiftComponent } from './shifts/add-shift/add-shift.component';
import { EditShiftComponent } from './shifts/edit-shift/edit-shift.component';
import { DeleteShiftComponent } from './shifts/delete-shift/delete-shift.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'shifts', pathMatch: 'full' },
      { path: 'shifts', component: ShiftsComponent },
      { path: 'add-shift', component: AddShiftComponent },
      { path: 'edit-shift/:id', component: EditShiftComponent },
      { path: 'delete-shift/:id', component: DeleteShiftComponent },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }