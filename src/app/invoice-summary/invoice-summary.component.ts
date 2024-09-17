import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { VendorService } from '../services/vendor.service';
import { CurrencyService } from '../services/currency.service';
import { Invoice } from '../models/invoice.model';
import { Vendor } from '../models/vendor.model';
import { Currency } from '../models/currency.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css']
})
export class InvoiceSummaryComponent implements OnInit {
  invoices: Invoice[] = [];
  vendors: Vendor[] = [];
  currencies: Currency[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private vendorService: VendorService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(invoices => this.invoices = invoices);
    this.vendorService.getVendors().subscribe(vendors => this.vendors = vendors);
    this.currencyService.getCurrencies().subscribe(currencies => this.currencies = currencies);
  }

  exportToExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.invoices);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invoices');
    XLSX.writeFile(wb, 'invoices.xlsx');
  }

  deleteInvoice(id: string): void {
    this.invoiceService.deleteInvoice(id).subscribe(() => {
      this.invoices = this.invoices.filter(invoice => invoice.invoiceId !== id);
    });
  }

  getVendorName(vendorId: string): string {
    const vendor = this.vendors.find(v => v.vendorId === vendorId);
    return vendor ? vendor.vendorLongName : 'Unknown';
  }
  
  getCurrencyName(currencyId: string): string {
    const currency = this.currencies.find(c => c.currencyId === currencyId);
    return currency ? currency.currencyName : 'Unknown';
  }
  
  getCurrencyCode(currencyId: string): string {
    const currency = this.currencies.find(c => c.currencyId === currencyId);
    return currency ? currency.currencyCode : 'USD'; 
  }
  
}
