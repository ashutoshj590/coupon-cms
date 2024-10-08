import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import * as _ from 'lodash';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DialogForCoupon } from './dialog-coupon';
import { DialogEdit } from './dialog-edit';
import { DialogAdd } from './dialog-add';
import { DialogResetPassword } from './dialog-reset';


@Component({
  selector: 'app-icons',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {

  showSpinner = false;
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
    private http: HttpClient,
    private snackBar: MatSnackBar
    
  ) { }

  ngOnInit(): void {
    this.getAllMerchant();
    this.loadData();
       
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(()=> {
      this.showSpinner = false;
    }, 3000);
  }


  sort(key){
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
      data.merchant_list.forEach(function(obj, index) {
        if (obj.status == 0){
          obj.status = "false";
        } else if (obj.status == 1){
          obj.status = "true";
        }
      })
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


  clickOnAdd() {
  //  this.MerchantService.getMerchantDetail().subscribe((data: {}) => {
  //    this.merchantDetail = data;
      this.dialog.open(DialogAdd, {});
  //  });clickReset
     
}
clickReset() {
      this.dialog.open(DialogResetPassword, {});
     
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
        this.snackBar.open("item deleted Successfully!", "dismiss", {duration: 3000}); 
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
        case 'country_name':
          this.tempSellers = this.sellers.filter(item =>
            item.country_name != null && item.country_name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
          );
          this.tempTotalRecords = this.tempSellers.length;
          break;
          case 'zipcode_new':
          this.tempSellers = this.sellers.filter(item =>
            item.zipcode_new != null && item.zipcode_new.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
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



  dropDownData(event, type) {
    this.filterText = event;
    switch (type) {
      case 'status':
        this.tempSellers = this.sellers.filter(item => 
         item.status != null && item.status.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
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