import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesComponent } from './roles.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { EditRoleComponent } from './edit-role/edit-role.component';

const routes: Routes = [
  { path: '', component: RolesComponent }
];

@NgModule({
  declarations: [
    RolesComponent,
    AddRolesComponent,
    EditRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RolesModule { }