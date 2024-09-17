import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://localhost:7082/api/currency/currencylist'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl);
  }

  getCurrency(id: string): Observable<Currency> {
    return this.http.get<Currency>(`${this.apiUrl}/${id}`);
  }

  addCurrency(currency: Currency): Observable<Currency> {
    return this.http.post<Currency>(this.apiUrl, currency);
  }

  updateCurrency(id: string, currency: Currency): Observable<Currency> {
    return this.http.put<Currency>(`${this.apiUrl}/${id}`, currency);
  }

  deleteCurrency(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
