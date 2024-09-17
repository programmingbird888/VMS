import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/vendor.service';
import { Vendor } from '../models/vendor.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vendor-summary',
  templateUrl: './vendor-summary.component.html',
  styleUrls: ['./vendor-summary.component.css']
})
export class VendorSummaryComponent implements OnInit {
  vendors: Vendor[] = [];

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.vendorService.getVendors().subscribe(vendors => this.vendors = vendors);
    // console.log(this.vendors);
  }

  exportToExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.vendors);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vendors');
    XLSX.writeFile(wb, 'vendors.xlsx');
  }

  deleteVendor(code: string): void {
    this.vendorService.deleteVendor(code).subscribe(() => {
      this.vendors = this.vendors.filter(vendor => vendor.vendorCode !== code);
      console.log("Deleted!");  
    });
  }
}
// export class VendorSummaryComponent {
//   Vendors: Vendor[]=[];
//  constructor(private service:VendorService){}
// //  ngOnInit(){
// //   this.service.getAllUser().subscribe(resp=>this.users=resp);
// //  }
// fetchData() {
//   this.service.getVendors().subscribe((resp) => {
//     console.log('API Response:', resp); // Add this line to check the API response
//     this.Vendors = resp;
//   }, error => {
//     console.error('API Error:', error); // Add this line to log any API errors
//   });
// }
 
//  ngOnInit(){
//   this.fetchData();
//   console.log(this.Vendors)
//  }
// }
