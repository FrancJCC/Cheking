import { Injectable } from '@angular/core';
import { AlertService } from './shared/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private alertService: AlertService) {}

  handleError(error: any, friendlyMessage: string) {
    console.error(friendlyMessage, error);
    this.alertService.showError(friendlyMessage);
    return new Error(friendlyMessage);
  }
}