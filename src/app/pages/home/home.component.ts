// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavbarComponent } from '../../components/landing-navbar/landing-navbar.component';
import { FormsModule } from '@angular/forms';

type FaqCategory =
  | 'all'
  | 'getting-started'
  | 'billing'
  | 'features'
  | 'security'
  | 'support';

interface Faq {
  id: number;
  category: Exclude<FaqCategory, 'all'>;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LandingNavbarComponent, FormsModule],
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

  faqs: Faq[] = [
    {
      id: 1,
      category: 'getting-started',
      question: 'What is PaySella?',
      answer:
        'PaySella is a platform that simplifies the invoicing process for freelancers, small businesses, and entrepreneurs. Create, send, and manage invoices effectively, track payments, and stay on top of your finances—all in one place.',
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'How do I create my first invoice?',
      answer:
        'After signing up, navigate to the dashboard and click on "Create Invoice". Fill in the necessary details including customer information, itemized charges, payment terms, and then hit "Send" to deliver it directly to your client\'s email.',
    },
    {
      id: 3,
      category: 'features',
      question: 'Can I customize my invoices?',
      answer:
        'Yes! You can style your logo, choose from various template styles, and adjust colors to match your brand identity. Customize fields, add notes, and include payment instructions to make invoices personalized and professional.',
    },
    {
      id: 4,
      category: 'security',
      question: 'Is my financial information secure?',
      answer:
        'Absolutely. We use advanced encryption methods to protect your data and ensure secure transactions. Our platform is designed with security as a top priority, so you can send and receive payments with confidence.',
    },
    {
      id: 5,
      category: 'billing',
      question: 'How does payment processing work?',
      answer:
        'We will integrate with popular payment gateways (e.g., PayPal, Stripe) to enable secure online payments. You can choose to accept credit cards, bank transfers, or other secure methods as defined by your payment gateway.',
    },
    {
      id: 6,
      category: 'features',
      question: 'Can I track if my client has viewed the invoice?',
      answer:
        "Yes, you'll receive notifications when your client views the invoice and you can also see view status from dashboard. This helps you stay informed and follow up if needed to ensure timely payments.",
    },
    {
      id: 7,
      category: 'billing',
      question: 'Does PaySella support recurring invoices?',
      answer:
        "Yes, you can set up recurring invoices for clients with ongoing services. Choose your billing frequency, and we'll automatically send the invoices according to your schedule.",
    },
    {
      id: 8,
      category: 'billing',
      question: 'Are there any fees for sending invoices?',
      answer:
        "Creating and sending invoices is free on our platform. However, if you choose to receive online payments through integrated gateways, standard processing fees may apply as per the payment provider's terms.",
    },
    {
      id: 9,
      category: 'security',
      question: 'Can I import existing client and invoice data?',
      answer:
        'Yes, we support data imports to help you seamlessly transition to PaySella. Simply follow the instructions in the dashboard, or reach out to our support team for assistance.',
    },
    {
      id: 10,
      category: 'features',
      question: 'What kind of reports can I generate?',
      answer:
        'You can generate detailed financial reports, including income summaries, outstanding balances, payment histories, and more. Export reports as PDFs or spreadsheets for easy record-keeping and analysis.',
    },
    {
      id: 11,
      category: 'support',
      question: 'Is customer support available if I need help?',
      answer:
        "Yes, our customer support team is here to assist you! Contact us via chat, email, or phone for guidance with setting up or managing your account, and we'll be happy to help.",
    },
    {
      id: 12,
      category: 'getting-started',
      question: 'How do I sign up?',
      answer:
        'Signing up is easy—just click on the "Sign Up" button, fill in your details, and start managing your invoices right away. No credit card is required for our free plan.',
    },
  ];

  searchTerm = '';
  selectedCategory = 'all';
  expandedFaqId: number | null = null;

  faqCategories: FaqCategory[] = [
    'all',
    'getting-started',
    'billing',
    'features',
    'security',
    'support',
  ];

  toggleFaq(faqId: number) {
    this.expandedFaqId = this.expandedFaqId === faqId ? null : faqId;
  }

  formatCategoryName(category: string): string {
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  get filteredFaqs() {
    return this.faqs.filter(
      (faq) =>
        (this.selectedCategory === 'all' ||
          faq.category === this.selectedCategory) &&
        (faq.question.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
}
