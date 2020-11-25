import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DialogForCoupon } from './dialog-coupon';
import { DialogGallary } from './dialog-gallary';

@Component({
  selector: 'app-icons',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  allMerchants: any = [];
  allCoupons: any = [];
  allImages: any = [];
  public copy: string;



  constructor(
    private MerchantService: MerchantService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
    
  ) { }

  ngOnInit() {
    this.getAllMerchant();
  }




  getAllMerchant() {
    this.MerchantService.getAllMerchant().subscribe((data: {}) => {
      this.allMerchants = data;
    });
   
  }


  clickOnCouponDetail(id) {
    this.MerchantService.getCouponsById(id).subscribe((data: {}) => {
      this.allCoupons = data;
         this.dialog.open(DialogForCoupon, { data: this.allCoupons});
         
      
     });
             
  }

  clickOnGallary(id) {
    this.MerchantService.getImagesById(id).subscribe((data: {}) => {
      this.allImages = data;
      this.dialog.open(DialogGallary, { data: this.allImages});
    });
             
  }


  changeStatus(id) {
    this.MerchantService.statusForMerchant(id).subscribe((data: {}) => {
      this.allMerchants = data;
      window.location.reload()
    });
   
  }


}
