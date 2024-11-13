// src/app/pages/estimates/new-estimate/new-estimate.component.ts
import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {
  CurrencyPipe,
  DatePipe,
  isPlatformBrowser,
  CommonModule,
} from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

export interface EstimateItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface EditorConfig {
  toolbar: string[];
  placeholder?: string;
  language?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

@Component({
  selector: 'app-new-estimate',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    DatePipe,
    RouterModule,
    CurrencyPipe,
    FormsModule,
    SidebarComponent,
    CommonModule,
    CKEditorModule,
  ],
  templateUrl: './new-estimate.component.html',
  styleUrl: './new-estimate.component.css',
})
export class NewEstimateComponent implements OnInit {
  @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

  // Form fields
  summary = '';
  estimateNumber = '';
  selectedLogo: string | ArrayBuffer | null = null;
  client = '';
  dueDate = new Date().toISOString().split('T')[0];
  discount = 0;
  taxRate = 0;
  currency = 'USD';
  items: EstimateItem[] = [];
  isDragging = false;

  // Calculated fields
  subTotal = 0;
  taxAmount = 0;
  discountAmount = 0;
  totalAmount = 0;

  // Editor configuration
  public Editor: any = null;
  footnote = '';
  public get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  editorConfig: EditorConfig = {
    placeholder: 'Enter your footnote here...',
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'alignment',
      'indent',
      'outdent',
      '|',
      'undo',
      'redo',
    ],
    language: 'en',
  };

  // Dropdown options
  clients: Client[] = [
    { id: '1', name: 'Boye', email: 'boye@example.com', address: 'Address 1' },
    {
      id: '2',
      name: 'Gilbert',
      email: 'gilbert@example.com',
      address: 'Address 2',
    },
    { id: '3', name: 'Tony', email: 'tony@example.com', address: 'Address 3' },
  ];

  currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  ];
  private router = inject(Router);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    // Initialize editor in browser environment
    if (this.isBrowser) {
      try {
        const editorModule = await import('@ckeditor/ckeditor5-build-classic');
        this.Editor = editorModule.default;
        console.log('Editor loaded:', !!this.Editor);
      } catch (error) {
        console.error('Editor load error:', error);
      }
    }

    // Initialize estimate
    const navigation = this.router.getCurrentNavigation();
    const existingEstimate = navigation?.extras.state?.['estimate'];

    if (existingEstimate) {
      this.loadExistingEstimate(existingEstimate);
    } else {
      this.initializeEstimate();
    }
  }

  private loadExistingEstimate(estimate: any) {
    this.estimateNumber = estimate.estimateNumber;
    this.summary = estimate.summary;
    this.selectedLogo = estimate.logo;
    this.client = estimate.client;
    this.dueDate = estimate.dueDate;
    this.discount = estimate.discount;
    this.taxRate = estimate.taxRate;
    this.currency = estimate.currency;
    this.items = estimate.items;
    this.footnote = estimate.footnote;
    this.calculateTotals();
  }

  private initializeEstimate() {
    this.estimateNumber = `EST-${new Date().getFullYear()}${String(
      Date.now()
    ).slice(-4)}`;
    this.addItem();
  }

  addItem() {
    this.items.push({
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0,
    });
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.splice(index, 1);
      this.calculateTotals();
    }
  }

  calculateAmount(item: EstimateItem) {
    item.amount = Number((item.quantity * item.unitPrice).toFixed(2));
    this.calculateTotals();
  }

  calculateTotals() {
    this.subTotal = Number(
      this.items.reduce((total, item) => total + item.amount, 0).toFixed(2)
    );
    this.taxAmount = Number((this.subTotal * (this.taxRate / 100)).toFixed(2));
    this.discountAmount = Number(
      (this.subTotal * (this.discount / 100)).toFixed(2)
    );
    this.totalAmount = Number(
      (this.subTotal + this.taxAmount - this.discountAmount).toFixed(2)
    );
  }

  onSubmit() {
    if (this.validateForm()) {
      const estimate = {
        estimateNumber: this.estimateNumber,
        summary: this.summary,
        logo: this.selectedLogo,
        client: this.client,
        dueDate: this.dueDate,
        discount: this.discount,
        taxRate: this.taxRate,
        currency: this.currency,
        items: this.items,
        footnote: this.footnote,
        subTotal: this.subTotal,
        taxAmount: this.taxAmount,
        discountAmount: this.discountAmount,
        totalAmount: this.totalAmount,
      };

      console.log('Estimate created:', estimate);
      this.router.navigate(['/estimates/preview'], { state: { estimate } });
    }
  }

  private validateForm(): boolean {
    if (!this.summary.trim()) {
      alert('Please enter a summary');
      return false;
    }

    if (!this.client) {
      alert('Please select a client');
      return false;
    }

    if (!this.dueDate) {
      alert('Please select a due date');
      return false;
    }

    if (!this.items.length) {
      alert('Please add at least one item');
      return false;
    }

    for (const item of this.items) {
      if (!item.description.trim()) {
        alert('Please fill in all item descriptions');
        return false;
      }
      if (item.quantity <= 0) {
        alert('Quantity must be greater than 0');
        return false;
      }
      if (item.unitPrice <= 0) {
        alert('Unit price must be greater than 0');
        return false;
      }
    }

    return true;
  }

  // File handling methods
  onLogoClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.logoInput?.nativeElement) {
      this.logoInput.nativeElement.click();
    }
  }

  onLogoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.validateAndReadLogo(file);
    }
  }

  onLogoDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onLogoDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onLogoDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const file = event.dataTransfer?.files[0];
    if (file) {
      this.validateAndReadLogo(file);
    }
  }

  private validateAndReadLogo(file: File) {
    if (!file.type.match(/image\/(png|jpeg|jpg|gif)/)) {
      alert('Please upload a valid image file (PNG, JPEG, JPG, or GIF)');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedLogo = e.target?.result ?? null;
    };
    reader.onerror = () => {
      alert('Error reading file');
    };
    reader.readAsDataURL(file);
  }

  onChange({ editor }: any) {
    this.footnote = editor.getData();
  }

  onReady(editor: any) {
    console.log('Editor is ready to use!', editor);
  }

  onDragEvent(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const dt = event.dataTransfer;
    const files = dt?.files;

    if (files?.length) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    // Read and set the file
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.selectedLogo = e.target?.result as string;
    };
    reader.onerror = () => {
      alert('Error reading file');
    };
    reader.readAsDataURL(file);
  }

  removeLogo(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedLogo = null;
    if (this.logoInput.nativeElement) {
      this.logoInput.nativeElement.value = '';
    }
  }
}
