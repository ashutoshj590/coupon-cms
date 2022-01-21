import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { CouponDetail } from './coupon-detail'

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  allConsumer: any = [];
  public copy: string;
  allCoupons: any = [];

  allrequests: any = [];

    filterText = '';
    sellers = [];
    tempSellers = [];
    tempTotalRecords: number = 0;
    p: number = 1;
    totalRecords: number = 0;
    pageSize: number = 10;

    key: string = 'id';
    reverse: boolean = false;
    showSpinner = false;
    couponDetail: any = {};

  constructor(
    private MerchantService: MerchantService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
    
  ) { }

 
  ngOnInit(){
    this.getAllreq();
    this.loadData();
  
  }



  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(()=> {
      this.showSpinner = false;
    }, 1000);
  }


  getAllreq() {
    this.MerchantService.getAllCoupons().subscribe(data => {
         this.sellers = this.tempSellers = data.coupon_list;
         this.totalRecords = this.tempTotalRecords = this.sellers.length;
       }); 
   
  }


  


  clickOnDetail(id) {
    this.MerchantService.getCouponDetail(id).subscribe((data: {}) => {
      this.couponDetail = data;
     this.dialog.open(CouponDetail, {data: this.couponDetail});
   });
     
  }

  

 
  



   filterData(event, type) {
    this.filterText = event.target.value;
    switch (type) {
      case 'email':
        this.tempSellers = this.sellers.filter(item =>
          item.email != null && item.email.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
      case 'coupon_type':
        this.tempSellers = this.sellers.filter(item =>
          item.coupon_type != null && item.coupon_type.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
        case 'name':
          this.tempSellers = this.sellers.filter(item =>
            item.name != null && item.name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
          );
          this.tempTotalRecords = this.tempSellers.length;
          break;
        case 'expiry_date':
          this.tempSellers = this.sellers.filter(item =>
            item.expiry_date != null && item.expiry_date.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
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
