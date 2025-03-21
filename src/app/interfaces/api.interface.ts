export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface Shifts {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}