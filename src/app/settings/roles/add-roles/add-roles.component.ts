import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RolesService } from '../../../services/roles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddRolesComponent implements OnInit {
  @Input() roleId?: number;
  @Output() closeModal = new EventEmitter<boolean>();
  
  roleForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.roleForm.invalid) {
      Object.keys(this.roleForm.controls).forEach(key => {
        const control = this.roleForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.rolesService.addRole(this.roleForm.value).subscribe({
      next: () => {
        this.closeModal.emit(true);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.closeModal.emit(false);
  }
}