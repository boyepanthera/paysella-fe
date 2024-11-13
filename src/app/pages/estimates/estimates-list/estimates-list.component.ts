import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface Estimate {
  id: number;
  number: string;
  client: string;
  amount: number;
  dueDate: Date;
  status: string;
}

@Component({
  selector: 'app-estimates-list',
  templateUrl: './estimates-list.component.html',
  styleUrls: ['./estimates-list.component.css'],
  imports: [
    DatePipe,
    RouterModule,
    CurrencyPipe,
    FormsModule,
    SidebarComponent,
    CommonModule,
  ],
  standalone: true,
})
export class EstimatesListComponent implements OnInit {
  estimates: Estimate[] = [];
  filteredEstimates: Estimate[] = [];
  filters = ['All', 'Sent', 'Overdue', 'Draft'];
  displayedEstimates: Estimate[] = [];
  currentFilter = 'All';
  pageSize = 10;
  totalEstimates = 0;

  currentPage = 1;
  totalPages = 0;
  pages: number[] = [];

  ngOnInit() {
    // Fetch estimates data from API or service
    this.estimates = [
      // Sample data

      {
        id: 1,
        number: 'EST-0001',
        client: 'Acme Inc.',
        amount: 250000,
        dueDate: new Date('2024-11-15'),
        status: 'Overdue',
      },
      {
        id: 2,
        number: 'EST-0002',
        client: 'Acme Inc.',
        amount: 250500,
        dueDate: new Date('2024-11-22'),
        status: 'Draft',
      },
      {
        id: 3,
        number: 'EST-0003',
        client: 'Globex Corp.',
        amount: 251000,
        dueDate: new Date('2024-11-29'),
        status: 'Sent',
      },
      {
        id: 4,
        number: 'EST-0004',
        client: 'Soylent Corp.',
        amount: 251500,
        dueDate: new Date('2024-12-06'),
        status: 'Overdue',
      },
      {
        id: 5,
        number: 'EST-0005',
        client: 'Initech LLC',
        amount: 252000,
        dueDate: new Date('2024-12-13'),
        status: 'Draft',
      },
      {
        id: 6,
        number: 'EST-0006',
        client: 'Acme Inc.',
        amount: 252500,
        dueDate: new Date('2024-12-20'),
        status: 'Sent',
      },
      {
        id: 7,
        number: 'EST-0007',
        client: 'Globex Corp.',
        amount: 253000,
        dueDate: new Date('2024-12-27'),
        status: 'Overdue',
      },
      {
        id: 8,
        number: 'EST-0008',
        client: 'Soylent Corp.',
        amount: 253500,
        dueDate: new Date('2025-01-03'),
        status: 'Draft',
      },
      {
        id: 9,
        number: 'EST-0009',
        client: 'Initech LLC',
        amount: 254000,
        dueDate: new Date('2025-01-10'),
        status: 'Sent',
      },
      {
        id: 10,
        number: 'EST-0010',
        client: 'Acme Inc.',
        amount: 254500,
        dueDate: new Date('2025-01-17'),
        status: 'Overdue',
      },
      {
        id: 11,
        number: 'EST-0011',
        client: 'Globex Corp.',
        amount: 255000,
        dueDate: new Date('2025-01-24'),
        status: 'Draft',
      },
      {
        id: 12,
        number: 'EST-0012',
        client: 'Soylent Corp.',
        amount: 255500,
        dueDate: new Date('2025-01-31'),
        status: 'Sent',
      },
      {
        id: 13,
        number: 'EST-0013',
        client: 'Initech LLC',
        amount: 256000,
        dueDate: new Date('2025-02-07'),
        status: 'Overdue',
      },
      {
        id: 14,
        number: 'EST-0014',
        client: 'Acme Inc.',
        amount: 256500,
        dueDate: new Date('2025-02-14'),
        status: 'Draft',
      },
      {
        id: 15,
        number: 'EST-0015',
        client: 'Globex Corp.',
        amount: 257000,
        dueDate: new Date('2025-02-21'),
        status: 'Sent',
      },
      {
        id: 16,
        number: 'EST-0016',
        client: 'Soylent Corp.',
        amount: 257500,
        dueDate: new Date('2025-02-28'),
        status: 'Overdue',
      },
      {
        id: 17,
        number: 'EST-0017',
        client: 'Initech LLC',
        amount: 258000,
        dueDate: new Date('2025-03-07'),
        status: 'Draft',
      },
      {
        id: 18,
        number: 'EST-0018',
        client: 'Acme Inc.',
        amount: 258500,
        dueDate: new Date('2025-03-14'),
        status: 'Sent',
      },
      {
        id: 19,
        number: 'EST-0019',
        client: 'Globex Corp.',
        amount: 259000,
        dueDate: new Date('2025-03-21'),
        status: 'Overdue',
      },
      {
        id: 20,
        number: 'EST-0020',
        client: 'Soylent Corp.',
        amount: 259500,
        dueDate: new Date('2025-03-28'),
        status: 'Draft',
      },
      {
        id: 106,
        number: 'EST-0106',
        client: 'Initech LLC',
        amount: 283500,
        dueDate: new Date('2025-08-29'),
        status: 'Overdue',
      },
      {
        id: 107,
        number: 'EST-0107',
        client: 'Soylent Corp.',
        amount: 265000,
        dueDate: new Date('2025-09-05'),
        status: 'Sent',
      },
      {
        id: 108,
        number: 'EST-0108',
        client: 'Globex Corp.',
        amount: 292500,
        dueDate: new Date('2025-09-12'),
        status: 'Draft',
      },
      {
        id: 109,
        number: 'EST-0109',
        client: 'Acme Inc.',
        amount: 288000,
        dueDate: new Date('2025-09-19'),
        status: 'Overdue',
      },
      {
        id: 110,
        number: 'EST-0110',
        client: 'Soylent Corp.',
        amount: 275500,
        dueDate: new Date('2025-09-26'),
        status: 'Sent',
      },
      {
        id: 111,
        number: 'EST-0111',
        client: 'Initech LLC',
        amount: 296000,
        dueDate: new Date('2025-10-03'),
        status: 'Draft',
      },
      {
        id: 112,
        number: 'EST-0112',
        client: 'Globex Corp.',
        amount: 284500,
        dueDate: new Date('2025-10-10'),
        status: 'Overdue',
      },
      {
        id: 113,
        number: 'EST-0113',
        client: 'Acme Inc.',
        amount: 289300,
        dueDate: new Date('2025-10-17'),
        status: 'Sent',
      },
      {
        id: 114,
        number: 'EST-0114',
        client: 'Initech LLC',
        amount: 277400,
        dueDate: new Date('2025-10-24'),
        status: 'Draft',
      },
      {
        id: 115,
        number: 'EST-0115',
        client: 'Soylent Corp.',
        amount: 294800,
        dueDate: new Date('2025-10-31'),
        status: 'Overdue',
      },
      {
        id: 116,
        number: 'EST-0116',
        client: 'Globex Corp.',
        amount: 295900,
        dueDate: new Date('2025-11-07'),
        status: 'Sent',
      },
      {
        id: 117,
        number: 'EST-0117',
        client: 'Acme Inc.',
        amount: 284600,
        dueDate: new Date('2025-11-14'),
        status: 'Draft',
      },
      {
        id: 118,
        number: 'EST-0118',
        client: 'Soylent Corp.',
        amount: 273400,
        dueDate: new Date('2025-11-21'),
        status: 'Overdue',
      },
      {
        id: 119,
        number: 'EST-0119',
        client: 'Initech LLC',
        amount: 290300,
        dueDate: new Date('2025-11-28'),
        status: 'Sent',
      },
      {
        id: 120,
        number: 'EST-0120',
        client: 'Globex Corp.',
        amount: 298400,
        dueDate: new Date('2025-12-05'),
        status: 'Draft',
      },
      {
        id: 121,
        number: 'EST-0121',
        client: 'Acme Inc.',
        amount: 287700,
        dueDate: new Date('2025-12-12'),
        status: 'Overdue',
      },
      {
        id: 122,
        number: 'EST-0122',
        client: 'Soylent Corp.',
        amount: 265400,
        dueDate: new Date('2025-12-19'),
        status: 'Sent',
      },
      {
        id: 123,
        number: 'EST-0123',
        client: 'Initech LLC',
        amount: 294500,
        dueDate: new Date('2025-12-26'),
        status: 'Draft',
      },
      {
        id: 124,
        number: 'EST-0124',
        client: 'Globex Corp.',
        amount: 283300,
        dueDate: new Date('2026-01-02'),
        status: 'Overdue',
      },
      {
        id: 125,
        number: 'EST-0125',
        client: 'Acme Inc.',
        amount: 299500,
        dueDate: new Date('2026-01-09'),
        status: 'Sent',
      },
      {
        id: 126,
        number: 'EST-0126',
        client: 'Soylent Corp.',
        amount: 288000,
        dueDate: new Date('2026-01-16'),
        status: 'Draft',
      },
      {
        id: 127,
        number: 'EST-0127',
        client: 'Initech LLC',
        amount: 291700,
        dueDate: new Date('2026-01-23'),
        status: 'Overdue',
      },
      {
        id: 128,
        number: 'EST-0128',
        client: 'Globex Corp.',
        amount: 272800,
        dueDate: new Date('2026-01-30'),
        status: 'Sent',
      },
      {
        id: 129,
        number: 'EST-0129',
        client: 'Acme Inc.',
        amount: 293600,
        dueDate: new Date('2026-02-06'),
        status: 'Draft',
      },
      {
        id: 130,
        number: 'EST-0130',
        client: 'Soylent Corp.',
        amount: 285200,
        dueDate: new Date('2026-02-13'),
        status: 'Overdue',
      },
      {
        id: 131,
        number: 'EST-0131',
        client: 'Initech LLC',
        amount: 289900,
        dueDate: new Date('2026-02-20'),
        status: 'Sent',
      },
      {
        id: 132,
        number: 'EST-0132',
        client: 'Globex Corp.',
        amount: 279500,
        dueDate: new Date('2026-02-27'),
        status: 'Draft',
      },
      {
        id: 133,
        number: 'EST-0133',
        client: 'Acme Inc.',
        amount: 291200,
        dueDate: new Date('2026-03-06'),
        status: 'Overdue',
      },
      {
        id: 134,
        number: 'EST-0134',
        client: 'Soylent Corp.',
        amount: 287400,
        dueDate: new Date('2026-03-13'),
        status: 'Sent',
      },
      {
        id: 135,
        number: 'EST-0135',
        client: 'Initech LLC',
        amount: 295700,
        dueDate: new Date('2026-03-20'),
        status: 'Draft',
      },
    ];
    this.filterEstimates();
    this.setFilter(this.currentFilter);
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.currentPage = 1; // Reset to first page when filter changes
    this.filterEstimates();
  }

  filterEstimates() {
    if (this.currentFilter === 'All') {
      this.filteredEstimates = this.estimates;
    } else {
      this.filteredEstimates = this.estimates.filter(
        (estimate) => estimate.status === this.currentFilter
      );
    }
    this.totalEstimates = this.filteredEstimates.length;
    this.totalPages = Math.ceil(this.totalEstimates / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updateDisplayedEstimates();
  }

  updateDisplayedEstimates() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedEstimates = this.filteredEstimates.slice(
      startIndex,
      endIndex
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedEstimates();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedEstimates();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedEstimates();
    }
  }

  getMinValue(a: number, b: number): number {
    return Math.min(a, b);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      // Add more cases for other statuses
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
