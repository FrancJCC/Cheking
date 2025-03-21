import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  name: string;
  position: string;
  avatar: string;
}

interface AttendanceRecord {
  employee: Employee;
  date: string;
  entryTime: string;
  status: 'complete' | 'late' | 'absent';
  entryStatus: 'on-time' | 'late';
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RecordsComponent implements OnInit {
  // Datos de ejemplo para la tabla
  records: AttendanceRecord[] = [
    {
      employee: {
        name: 'Ana García',
        position: 'Desarrollador Senior',
        avatar: 'assets/avatar1.png'
      },
      date: '01/03/2024',
      entryTime: '09:00 AM',
      status: 'complete',
      entryStatus: 'on-time'
    },
    {
      employee: {
        name: 'Carlos López',
        position: 'Diseñador UI',
        avatar: 'assets/avatar2.png'
      },
      date: '01/03/2024',
      entryTime: '09:15 AM',
      status: 'late',
      entryStatus: 'late'
    },
    {
      employee: {
        name: 'María Rodríguez',
        position: 'Project Manager',
        avatar: 'assets/avatar3.png'
      },
      date: '01/03/2024',
      entryTime: '08:55 AM',
      status: 'complete',
      entryStatus: 'on-time'
    }
  ];

  // Variables para controlar los filtros y la vista
  currentView: 'daily' | 'weekly' | 'monthly' = 'daily';
  searchTerm: string = '';
  selectedMonth: string = 'Enero 2024';
  currentPage: number = 1;
  totalPages: number = 10;

  constructor() { }

  ngOnInit(): void {
    // Aquí irá la lógica de inicialización
  }

  // Funciones para los filtros y controles
  searchEmployees(term: string): void {
    this.searchTerm = term;
    // Implementar la lógica de búsqueda
    if (term.trim()) {
      // Filtrar por nombre o posición
      const searchTerm = term.toLowerCase();
      // Aquí iría la lógica real de búsqueda conectada al backend
      console.log('Buscando:', searchTerm);
    }
  }

  filterByMonth(month: string): void {
    this.selectedMonth = month;
    // Implementar la lógica de filtrado por mes
    // Aquí iría la lógica real de filtrado conectada al backend
    console.log('Filtrando por mes:', month);
  }

  toggleView(view: 'daily' | 'weekly' | 'monthly'): void {
    this.currentView = view;
    // Implementar la lógica de cambio de vista
    // Aquí iría la lógica real de cambio de vista conectada al backend
    console.log('Cambiando vista a:', view);
  }

  handlePagination(page: number): void {
    this.currentPage = page;
    // Implementar la lógica de paginación
    // Aquí iría la lógica real de paginación conectada al backend
    console.log('Cambiando a página:', page);
  }

  // Función para el botón de acciones
  handleAction(record: any): void {
    console.log('Acción para:', record);
    // Implementar la lógica de acciones
  }

  // Getter para los números de página
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
} 