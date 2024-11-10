import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
})
export class AppNavbarComponent {
  isMobileMenuOpen = false;
  isProfileDropdownOpen = false;

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  logout() {
    // Here we would typically:
    // 1. Call auth service to clear tokens/session
    // 2. Clear any local storage
    // 3. Navigate to login page

    // For now, we'll just navigate to login
    this.router.navigate(['/login']);
  }

  // Optional: Close dropdown when clicking outside
  onClickOutside() {
    if (this.isProfileDropdownOpen) {
      this.isProfileDropdownOpen = false;
    }
  }

  // Optional: Create new invoice
  createNewInvoice() {
    this.router.navigate(['/invoices/new']);
  }
}
