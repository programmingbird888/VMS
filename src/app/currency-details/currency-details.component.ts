import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import { Currency } from '../models/currency.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {
  currencyForm: FormGroup;
  currencyId: string | null = null;

  constructor(
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.currencyForm = this.fb.group({
      CurrencyName: ['', Validators.required],
      CurrencyCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currencyId = this.route.snapshot.paramMap.get('id');
    if (this.currencyId) {
      this.currencyService.getCurrency(this.currencyId).subscribe(currency => {
        this.currencyForm.patchValue(currency);
      });
    }
  }

  onSubmit(): void {
    if (this.currencyForm.valid) {
      if (this.currencyId) {
        this.currencyService.updateCurrency(this.currencyId, this.currencyForm.value).subscribe(() => {
          this.router.navigate(['/currencies']);
        });
      } else {
        this.currencyService.addCurrency(this.currencyForm.value).subscribe(() => {
          this.router.navigate(['/currencies']);
        });
      }
    }
  }

  onDelete(): void {
    if (this.currencyId) {
      this.currencyService.deleteCurrency(this.currencyId).subscribe(() => {
        this.router.navigate(['/currencies']);
      });
    }
  }
}
