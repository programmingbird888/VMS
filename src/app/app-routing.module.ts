import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorSummaryComponent } from './vendor-summary/vendor-summary.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { CurrencySummaryComponent } from './currency-summary/currency-summary.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

const routes: Routes = [
  { path: 'vendors', component: VendorSummaryComponent },
  { path: 'vendors/:id', component: VendorDetailsComponent },
  { path: 'currencies', component: CurrencySummaryComponent },
  { path: 'currencies/:id', component: CurrencyDetailsComponent },
  { path: 'invoices', component: InvoiceSummaryComponent },
  { path: 'invoices/:id', component: InvoiceDetailsComponent },
  { path: '', redirectTo: '/vendors', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
