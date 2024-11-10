// src/app/pages/signup/signup.component.ts
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppNavbarComponent } from '../../components/app-navbar/app-navbar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AppNavbarComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  socialLoginOptions = [{ name: 'Google', icon: 'google-logo.svg' }];

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'
          ),
        ],
      ],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  getEmailError(): string {
    const control = this.signupForm.get('email');
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Email is required';
      if (control.errors['email'] || control.errors['pattern']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }

  getPhoneError(): string {
    const control = this.signupForm.get('phone');
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Phone number is required';
      if (control.errors['pattern']) {
        return 'Please enter a valid 10-digit phone number';
      }
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.signupForm.get('password');
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Password is required';
      if (control.errors['minlength']) {
        return 'Password must be at least 8 characters';
      }
      if (control.errors['pattern']) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
    }
    return '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      // Simulate API call
      setTimeout(() => {
        console.log('Sign up:', this.signupForm.value);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      }, 1500);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
  signUpWithGoogle() {
    // Changed from socialLogin()
    console.log('Google sign-up clicked');
    // Implement Google sign-up logic
  }

  // socialLogin(provider: string) {
  //   if (provider === 'Google') {
  //     this.signUpWithGoogle();
  //   }
  // }
}
