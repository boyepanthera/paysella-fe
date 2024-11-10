// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Chart } from 'chart.js/auto';

interface RevenueSummary {
  title: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down';
}

interface PendingInvoice {
  id: number;
  number: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  timeFilters = ['Today', 'This Week', 'This Month', 'This Year', 'Range'];
  currentFilter = 'Today';

  revenueSummaries: RevenueSummary[] = [
    { title: 'Total Revenue', amount: 20000000, percentage: 8.0, trend: 'up' },
    { title: 'Total Expenses', amount: 20000000, percentage: 1.2, trend: 'up' },
    {
      title: 'Outstanding Revenue',
      amount: 20000000,
      percentage: 1.2,
      trend: 'up',
    },
    {
      title: 'Available Balance',
      amount: 20000000,
      percentage: 1.2,
      trend: 'up',
    },
  ];

  pendingInvoices: PendingInvoice[] = [
    {
      id: 1,
      number: 'INV-001',
      clientName: 'John Doe',
      amount: 500000,
      dueDate: '13 Nov 2024',
      status: 'Unpaid',
    },
    // ... add more invoices
  ];

  ngOnInit() {
    this.initializeCharts();
  }

  setTimeFilter(filter: string) {
    this.currentFilter = filter;
    // Update data based on filter
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status.toLowerCase()) {
      case 'unpaid':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'over due':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  private initializeCharts() {
    // Initialize Expenses Chart
    new Chart('expensesChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: 'Monthly Expenses',
            data: [2000, 1500, 2200],
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Initialize Income Chart
    new Chart('incomeChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: 'Monthly Income',
            data: [3000, 3500, 3200],
            borderColor: 'rgb(34, 197, 94)',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
