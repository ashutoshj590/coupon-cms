import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import * as _ from 'lodash';

import { DialogForCoupon } from './dialog-coupon';
import { DialogEdit } from './dialog-edit';

@Component({
  selector: 'app-icons',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {


  allMerchants: any = [];
  allCoupons: any = [];
  allImages: any = [];
 
  merchantDetail: any = {};
  public copy: string;


    filterText = '';
    sellers = [];
    tempSellers = [];
    tempTotalRecords: number = 0;
    p: number = 1;
    totalRecords: number = 0;
    pageSize: number = 10;

    key: string = 'id';
    reverse: boolean = false;


  constructor(
    private MerchantService: MerchantService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient
    
  ) { }

  ngOnInit(): void {
    this.getAllMerchant();
       
  }


  sort(key){
    console.log("clicked !!!")
    this.key = key;
    this.reverse = !this.reverse;
  }

 /* getAllMerchant() {
    this.MerchantService.getAllMerchant().subscribe((data: {}) => {
      this.allMerchants = data;
    });
   
  } */


  getAllMerchant() {
    this.MerchantService.getAllMerchant().subscribe(data => {
      //   this.allCategories = data
         this.sellers = this.tempSellers = data.merchant_list;
         this.totalRecords = this.tempTotalRecords = this.sellers.length;
       }); 
  }


  clickOnCouponDetail(id) {
    this.MerchantService.getCouponsById(id).subscribe((data: {}) => {
      this.allCoupons = data;
         this.dialog.open(DialogForCoupon, { data: this.allCoupons});
         
      
     });
             
  }

  

  clickOnEdit(id) {
      this.MerchantService.getMerchantDetail(id).subscribe((data: {}) => {
        this.merchantDetail = data;
        this.dialog.open(DialogEdit, { data: this.merchantDetail});
      });
       
  }


  changeStatus(id) {
    this.MerchantService.statusForMerchant(id).subscribe((data: {}) => {
      this.allMerchants = data;
      window.location.reload()
    });
   
  }

  

   warningDialog(id) {
    let dialogRef = this.dialog.open(warningDialogMerchant);
    dialogRef.afterClosed().subscribe(result  => {
     if (result == "true"){
       this.MerchantService.deleteMerchant(id).subscribe((data: {}) => { 
         window.location.reload();
       });
     }
     console.log(result);
    });
   }


   filterData(event, type) {
    this.filterText = event.target.value;
    switch (type) {
      case 'business_name':
        this.tempSellers = this.sellers.filter(item =>
          item.business_name != null && item.business_name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
      case 'email':
        this.tempSellers = this.sellers.filter(item =>
          item.email != null && item.email.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
      case 'phone_no':
        this.tempSellers = this.sellers.filter(item =>
          item.phone_no != null && item.phone_no.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
      case 'website':
        this.tempSellers = this.sellers.filter(item =>
          item.website != null && item.website.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
      case 'business_license_no':
        this.tempSellers = this.sellers.filter(item =>
          item.business_license_no != null && item.business_license_no.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
        case 'date':
          this.tempSellers = this.sellers.filter(item =>
            item.createdAt != null && item.createdAt.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
          );
          this.tempTotalRecords = this.tempSellers.length;
          break;
    }
    if(this.filterText.length == 0) {
      this.tempSellers = this.sellers;
      this.tempTotalRecords = this.tempSellers.length;
    }
    this.p = 1;
  }




  



}
/* code always on the bottom of page. **************************** */
@Component({
  selector: 'warning-dialog.component',
  templateUrl: 'warning-dialog.component.html',
})
export class warningDialogMerchant {}