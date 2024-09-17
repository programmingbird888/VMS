import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'https://localhost:7082/api/vendor/vendorlist'; 
  private apiWriteUrl = 'https://localhost:7082/api/vendor/deletevendor?code='; 

  constructor(private http: HttpClient) {}

  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl);
  }

  getVendor(code: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${code}`);
  }

  addVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, vendor);
  }

  updateVendor(code: string, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiWriteUrl}/${code}`, vendor);
  }

  deleteVendor(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiWriteUrl}${code}`);
  }
}
