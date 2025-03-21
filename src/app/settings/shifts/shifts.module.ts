import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShiftsComponent } from './shifts.component';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { EditShiftComponent } from './edit-shift/edit-shift.component';

@NgModule({
  declarations: [
    ShiftsComponent,
    AddShiftComponent,
    EditShiftComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ShiftsModule { }