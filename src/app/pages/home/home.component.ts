// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavbarComponent } from '../../components/landing-navbar/landing-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LandingNavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  features = [
    {
      title: 'Simple and Fast Invoicing',
      description:
        'Create professional invoices in just a few clicks. No complicated setup or learning curve—get started right away.',
    },
    {
      title: 'Get Paid Faster',
      description:
        'Automated reminders and payment tracking help you reduce late payments, ensuring you get paid on time, every time.',
    },
    {
      title: 'Secure Payment Integration',
      description:
        'Link your bank account or payment gateway with confidence. We use top-tier encryption to keep your financial data safe.',
    },
    {
      title: 'Customizable Invoices',
      description:
        "Tailor your invoices with your brand's logo, colors, and details. Impress clients while maintaining a professional image.",
    },
    {
      title: 'Seamless Expense Tracking',
      description:
        'Keep track of all your expenses and payments in one place, making financial management easier and more transparent.',
    },
  ];

  howItWorks = [
    {
      title: 'Sign Up',
      description:
        "Getting started is easy! Create your account in just a few clicks. Simply enter your details, and you're ready to begin your seamless invoicing process.",
    },
    {
      title: 'Add your bank Account',
      description:
        'Link your bank account securely within minutes. Our platform uses the latest encryption technology to ensure your data is always protected, allowing you to track payments and manage your cash flow effortlessly.',
    },
    {
      title: 'Start Transacting',
      description:
        "Once you're set up, start creating and sending invoices to clients instantly. Task payments in real time, manage operate invoices, and automate reminders all from one place. Get paid faster and focus on growing your business.",
    },
  ];

  reviews = [
    {
      name: 'John',
      role: 'Freelance Graphic Designer',
      content:
        "Before using this app, managing invoices and tracking payments was a constant headache. Now, I can create professional invoices, and I'm receiving late payments much faster than before.",
    },
    {
      name: 'Sarah',
      role: 'Owner of Bright Events',
      content:
        'As a small business owner, I needed an easy to use tool to help me manage my invoices and track payments. This platform has been a game-changer! The automated reminders make it easy to manage incoming payments.',
    },
    {
      name: 'James',
      role: 'IT Consultant',
      content:
        "The simplicity of this app is amazing. I create my first invoice right after signup, and I'm getting paid faster than ever before.",
    },
  ];

  plans = [
    {
      name: 'Free Plan',
      price: 0,
      description:
        'Ideal for growing businesses looking for more features and flexibility.',
      features: [
        'Limited Invoices',
        'Automated payment reminders',
        'Priority email and chat support',
      ],
    },
    {
      name: 'Pro Plan',
      price: 9,
      description:
        'Ideal for growing businesses looking for more features and flexibility.',
      features: [
        'Unlimited invoices',
        'Automated payment reminders',
        'Customizable invoice templates',
        'Recurring invoicing',
        'Priority email and chat support',
      ],
    },
    {
      name: 'Enterprise Plan',
      price: 19,
      description:
        'Best for larger businesses needing full customization and dedicated support.',
      features: [
        'Unlimited invoices and users',
        'Advanced reporting and analytics',
        'API access for custom integration',
        'Dedicated account manager',
        '24/7 priority support',
      ],
    },
  ];
}
