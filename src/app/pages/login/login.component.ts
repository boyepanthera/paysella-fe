// src/app/pages/login/login.component.ts
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppNavbarComponent } from '../../components/app-navbar/app-navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AppNavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  // Only Google for now, can add more social options later
  socialLoginOptions = [{ name: 'Google', icon: 'google-logo.svg' }];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
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
      rememberMe: [false],
    });

    // Check for remembered email
    if (isPlatformBrowser(this.platformId)) {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        this.loginForm.patchValue({ email: rememberedEmail });
      }
    }
  }

  getEmailError(): string {
    const control = this.loginForm.get('email');
    if (control?.errors && (control.touched || control.dirty)) {
      if (control.errors['required']) return 'Email is required';
      if (control.errors['email'] || control.errors['pattern']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.loginForm.get('password');
    if (control?.errors && (control.touched || control.dirty)) {
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
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      // Simulate API call
      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('rememberedEmail', this.loginForm.value.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
        }

        console.log('Login:', this.loginForm.value);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      }, 1500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  socialLogin(provider: string) {
    console.log(`${provider} sign-in clicked`);
    // Implement social login logic
  }
}
