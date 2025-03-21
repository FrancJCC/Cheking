import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company.component.html'
})
export class CompanyComponent {
  showSuccessMessage = false;
  errorMessage = '';
  isCompanyInfoVisible = true;

  toggleCompanyInfo(): void {
    this.isCompanyInfoVisible = !this.isCompanyInfoVisible;
  }
}