// src/app/pages/forgot-password/forgot-password.component.ts
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppNavbarComponent } from '../../components/app-navbar/app-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AppNavbarComponent, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  getEmailError(): string {
    const control = this.forgotPasswordForm.get('email');
    if (control?.errors && (control.touched || control.dirty)) {
      if (control.errors['required']) return 'Email is required';
      if (control.errors['email'] || control.errors['pattern']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Simulate API call
      setTimeout(() => {
        console.log('Forgot Password:', this.forgotPasswordForm.value);
        this.successMessage =
          'A password reset link has been sent to your email';
        this.isLoading = false;
      }, 1500);
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
