/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="page-title">Café Florette - Administración</h1>
      <p class="welcome-message">
        Panel de control de asistencias del personal.<br>
        Aquí podrás ver todos los registros organizados por fecha.
      </p>
      
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
  `
})
export class AdminComponent implements OnInit {
  attendanceByDate: Map<string, any[]> = new Map();

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.loadAttendanceRecords();
  }

  loadAttendanceRecords() {
    this.attendanceService.getAttendanceRecords().subscribe(records => {
      this.groupRecordsByDate(records);
    });
  }

  private groupRecordsByDate(records: any[]) {
    const grouped = records.reduce((groups: any, record: any) => {
      const date = new Date(record.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(record);
      return groups;
    }, {});

    this.attendanceByDate = new Map(Object.entries(grouped));
  }
}*/