import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { Currency } from '../models/currency.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-currency-summary',
  templateUrl: './currency-summary.component.html',
  styleUrls: ['./currency-summary.component.css']
})
export class CurrencySummaryComponent implements OnInit {
  currencies: Currency[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe(currencies => this.currencies = currencies);
  }

  exportToExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.currencies);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Currencies');
    XLSX.writeFile(wb, 'currencies.xlsx');
  }

  deleteCurrency(id: string): void {
    this.currencyService.deleteCurrency(id).subscribe(() => {
      this.currencies = this.currencies.filter(currency => currency.currencyId !== id);
    });
  }
}
