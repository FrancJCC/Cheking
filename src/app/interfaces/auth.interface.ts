export interface User {
  id: number;
  username: string;
  // ... otros campos del usuario
}

export interface LoginResponse {
  success: boolean;
  user: User;
  message?: string;
}