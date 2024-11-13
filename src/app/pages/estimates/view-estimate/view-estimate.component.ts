import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface Estimate {
  id: number;
  number: string;
  from: {
    name: string;
    address: string;
    phone: string;
  };
  to: {
    name: string;
    address: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
  subTotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
}

@Component({
  selector: 'app-view-estimate',
  standalone: true,
  templateUrl: './view-estimate.component.html',
  styleUrls: ['./view-estimate.component.css'],
  imports: [
    DatePipe,
    RouterModule,
    CurrencyPipe,
    FormsModule,
    SidebarComponent,
    CommonModule,
  ],
})
export class ViewEstimateComponent implements OnInit {
  estimate: Estimate = {
    id: 0,
    number: '',
    from: {
      name: '',
      address: '',
      phone: '',
    },
    to: {
      name: '',
      address: '',
      phone: '',
    },
    items: [],
    subTotal: 0,
    taxAmount: 0,
    discountAmount: 0,
    totalAmount: 0,
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const estimateId = this.route.snapshot.paramMap.get('id');
    this.estimate = {
      id: Number(estimateId),
      number: 'EST-0101',
      from: {
        name: 'Initech LLC',
        address: '123 Tech Street, Silicon Valley, CA 94043',
        phone: '+1 (555) 123-4567',
      },
      to: {
        name: 'Soylent Corp.',
        address: '456 Corporate Blvd, San Francisco, CA 94105',
        phone: '+1 (555) 987-6543',
      },
      items: [
        {
          name: 'Custom Software Development',
          quantity: 1,
          unitPrice: 50000,
          amount: 50000,
        },
        {
          name: 'Software Maintenance',
          quantity: 6,
          unitPrice: 3000,
          amount: 18000,
        },
        {
          name: 'Consulting Service',
          quantity: 10,
          unitPrice: 1500,
          amount: 15000,
        },
      ],
      subTotal: 83000,
      taxAmount: 8300,
      discountAmount: 5000,
      totalAmount: 86300,
    };
  }

  editEstimate() {
    this.router.navigate(['/estimates', this.estimate.id, 'edit']);
  }
}
