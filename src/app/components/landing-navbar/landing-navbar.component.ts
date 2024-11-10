// src/app/components/layout/landing-navbar/landing-navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.css'],
})
export class LandingNavbarComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
