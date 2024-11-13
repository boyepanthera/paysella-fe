import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface EstimateItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface Estimate {
  estimateNumber: string;
  summary: string;
  logo: string;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  billTo: {
    name: string;
    email: string;
    phone: string;
  };
  date: string;
  dueDate: string;
  items: EstimateItem[];
  footnote: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  estimateLink: string;
}

@Component({
  selector: 'app-estimate-preview',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './estimate-preview.component.html',
})
export class EstimatePreviewComponent implements OnInit, AfterViewInit {
  @ViewChild('estimateContent') estimateContent!: ElementRef;
  @ViewChild('pdfContent') pdfContent!: ElementRef;

  estimate: Estimate = {
    estimateNumber: 'EST-001',
    summary:
      'This a quote for the design and sewing of movie costumes for your upcoming movie shoot. Please let us know when you want to move on with this.',
    logo: '', // Add your logo URL here
    client: {
      name: 'Afrocentric Fashion Inc.',
      email: 'afrocentric@fashion.com',
      phone: '0812 345 7684',
    },
    billTo: {
      name: 'Afam Best Entertainment',
      email: 'afambest@gmail.com',
      phone: '0803 247 8473',
    },
    date: '08-11-2024',
    dueDate: '08-12-2024',
    items: [
      { description: 'Item one', quantity: 1, unitPrice: 0.0, amount: 0.0 },
      { description: 'Item one', quantity: 1, unitPrice: 0.0, amount: 0.0 },
      { description: 'Item one', quantity: 1, unitPrice: 0.0, amount: 0.0 },
      { description: 'Item one', quantity: 1, unitPrice: 0.0, amount: 0.0 },
    ],
    footnote:
      "Hipster ipsum tattooed brunch f'm baby. Microdosing af yes flanzen whatever level meggings pour-over solo pitchfork. Tattooed diy pug vaporware bootleg food. Axe pour-over tacos keytar deep celiac coffee. Blog pin fingerstache wolf man thundercats vape.",
    subtotal: 0.0,
    tax: 0.0,
    discount: 0.0,
    total: 2000.0,
    status: 'Draft',
    estimateLink: 'https://paysella.com/team/est001',
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { estimate: Estimate };

    if (state?.estimate) {
      this.estimate = state.estimate;
    }
  }

  ngAfterViewInit() {
    // Ensure ViewChild is initialized
    console.log('PDF Content Element:', this.pdfContent);
  }

  onEdit() {
    this.router.navigate(['/estimates/new'], {
      state: { estimate: this.estimate },
    });
  }

  isGeneratingPDF = false;
  async savePDF() {
    if (this.isGeneratingPDF) return;

    this.isGeneratingPDF = true;

    try {
      // Wait a bit for any pending renders to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      const content = this.pdfContent.nativeElement;
      const buttons = content.querySelector('.action-buttons');

      if (buttons) {
        buttons.style.display = 'none';
      }

      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Estimate-${this.estimate.estimateNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      const buttons =
        this.pdfContent.nativeElement.querySelector('.action-buttons');
      if (buttons) {
        buttons.style.display = 'flex';
      }
      this.isGeneratingPDF = false;
    }
  }
}
