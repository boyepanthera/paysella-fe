import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class DashboardComponent implements AfterViewInit {
  @ViewChild('expensesChart') expensesChartRef!: ElementRef;
  @ViewChild('incomeChart') incomeChartRef!: ElementRef;

  private expensesChart: Chart | null = null;
  private incomeChart: Chart | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Only initialize charts in browser environment
      setTimeout(() => {
        this.initializeCharts();
      }, 0);
    }
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
    if (!isPlatformBrowser(this.platformId)) return;

    // Clean up existing charts if they exist
    if (this.expensesChart) {
      this.expensesChart.destroy();
    }
    if (this.incomeChart) {
      this.incomeChart.destroy();
    }

    // Initialize Expenses Chart
    this.expensesChart = new Chart(this.expensesChartRef.nativeElement, {
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
        maintainAspectRatio: false,
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
    this.incomeChart = new Chart(this.incomeChartRef.nativeElement, {
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
        maintainAspectRatio: false,
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
