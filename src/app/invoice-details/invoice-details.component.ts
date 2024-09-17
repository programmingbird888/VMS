import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { VendorService } from '../services/vendor.service';
import { CurrencyService } from '../services/currency.service';
import { Invoice } from '../models/invoice.model';
import { Vendor } from '../models/vendor.model';
import { Currency } from '../models/currency.model';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  invoiceForm: FormGroup;
  invoiceId: string | null = null;
  vendors: Vendor[] = [];
  currencies: Currency[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private vendorService: VendorService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.invoiceForm = this.fb.group({
      InvoiceNumber: ['', Validators.required],
      VendorId: ['', Validators.required],
      InvoiceAmount: [0, [Validators.required, Validators.min(0)]],
      InvoiceCurrencyId: ['', Validators.required],
      InvoiceReceivedDate: [new Date(), Validators.required],
      InvoiceDueDate: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    this.loadVendors();
    this.loadCurrencies();

    if (this.invoiceId) {
      this.invoiceService.getInvoice(this.invoiceId).subscribe(invoice => {
        this.invoiceForm.patchValue(invoice);
      });
    }
  }

  loadVendors(): void {
    this.vendorService.getVendors().subscribe(vendors => this.vendors = vendors);
  }

  loadCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(currencies => this.currencies = currencies);
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      if (this.invoiceId) {
        this.invoiceService.updateInvoice(this.invoiceId, this.invoiceForm.value).subscribe(() => {
          this.router.navigate(['/invoices']);
        });
      } else {
        this.invoiceService.addInvoice(this.invoiceForm.value).subscribe(() => {
          this.router.navigate(['/invoices']);
        });
      }
    }
  }

  onDelete(): void {
    if (this.invoiceId) {
      this.invoiceService.deleteInvoice(this.invoiceId).subscribe(() => {
        this.router.navigate(['/invoices']);
      });
    }
  }
}
