import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as _ from 'lodash';
//import { DialogForConsumer } from './dialog-consumer'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  allConsumer: any = [];
  public copy: string;
  allCoupons: any = [];

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
    
  ) { }

 
  ngOnInit(){
    this.getAllCops();
  
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }



  getAllCops() {
    this.MerchantService.getAllCoupons().subscribe(data => {
     
         this.sellers = this.tempSellers = data.coupon_detail;
         this.totalRecords = this.tempTotalRecords = this.sellers.length;
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
      case 'type':
        this.tempSellers = this.sellers.filter(item =>
          item.type != null && item.type.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
        case 'device_type':
          this.tempSellers = this.sellers.filter(item =>
            item.device_type != null && item.device_type.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
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
