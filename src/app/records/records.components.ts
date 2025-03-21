/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../services/auth.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="main-content">
      <div class="container">
        <h1 class="page-title">Registro de Asistencias</h1>
        
        <div class="month-selector">
          <button 
            *ngFor="let month of months" 
            class="month-btn" 
            [class.active]="selectedMonth === month"
            (click)="selectMonth(month)">
            {{ month }}
          </button>
        </div>

        <div *ngFor="let date of attendanceByDate | keyvalue">
          <h2 class="attendance-date">{{ date.key | date:'fullDate':'':'es' }}</h2>
          <div class="admin-table-container">
            <table>
              <thead>
                <tr>
                  <th>ID Empleada</th>
                  <th>Nombre</th>
                  <th>Hora de Entrada</th>
                  <th>Hora de Salida</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let record of date.value">
                  <td>{{ record.employeeId }}</td>
                  <td>{{ record.employeeName }}</td>
                  <td>{{ record.checkIn | date:'shortTime':'':'es' }}</td>
                  <td>{{ record.checkOut | date:'shortTime':'':'es' }}</td>
                  <td>{{ record.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RecordsComponent implements OnInit {
  attendanceByDate: Map<string, any[]> = new Map();
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  selectedMonth = this.months[new Date().getMonth()];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.loadAttendanceRecords();
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    this.loadAttendanceRecords();
  }

  loadAttendanceRecords() {
    this.attendanceService.getAttendanceRecords().subscribe(records => {
      this.groupRecordsByDate(records);
    });
  }

}*/
