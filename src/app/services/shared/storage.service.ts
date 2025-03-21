import { Injectable } from '@angular/core';
import { User } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USER_KEY = 'user';

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  hasUser(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }
}