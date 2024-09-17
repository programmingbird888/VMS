import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';
import { Vendor } from '../models/vendor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {
  vendorForm: FormGroup;
  vendorCode: string | null = null;

  constructor(
    private vendorService: VendorService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.vendorForm = this.fb.group({
      vendorId: ['', Validators.required],
      vendorCode: ['', Validators.required],
      vendorLongName: ['', Validators.required],
      vendorPhoneNumber: [''],
      vendorEmail: [''],
      vendorCreatedOn: [new Date()],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.vendorCode = this.route.snapshot.paramMap.get('code');
    if (this.vendorCode) {
      this.vendorService.getVendor(this.vendorCode).subscribe(vendor => {
        this.vendorForm.patchValue(vendor);
      });
    }
  }

  onSubmit(): void {
    if (this.vendorForm.valid) {
      if (this.vendorCode) {
        this.vendorService.updateVendor(this.vendorCode, this.vendorForm.value).subscribe(() => {
          this.router.navigate(['/vendors']);
        });
      } else {
        this.vendorService.addVendor(this.vendorForm.value).subscribe(() => {
          this.router.navigate(['/vendors']);
        });
      }
    }
  }

  onDelete(): void {
    if (this.vendorCode) {
      this.vendorService.deleteVendor(this.vendorCode).subscribe(() => {
        this.router.navigate(['/vendors']);
      });
    }
    else{
      alert("Not Deleted!");
    }
  }
}
