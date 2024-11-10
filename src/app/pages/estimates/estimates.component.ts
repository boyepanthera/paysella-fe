import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

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
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.css'],
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
  currentFilter = 'All';
  pageSize = 10;
  totalEstimates = 0;

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
    ];
    this.filterEstimates();
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
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
  }
}
