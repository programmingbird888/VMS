import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorSummaryComponent } from './vendor-summary/vendor-summary.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { CurrencySummaryComponent } from './currency-summary/currency-summary.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorSummaryComponent,
    VendorDetailsComponent,
    CurrencySummaryComponent,
    CurrencyDetailsComponent,
    InvoiceSummaryComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
