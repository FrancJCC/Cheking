export interface Employee {
  id: number;
  name: string;
  // ... otros campos del empleado
}

export interface AttendanceRecord {
  id: number;
  user_id: number;
  date: string;
  time: string;
  // ... otros campos de asistencia
}