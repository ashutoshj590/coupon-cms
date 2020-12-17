import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as _ from 'lodash';
import { DialogForConsumer } from './dialog-consumer'

@Component({
  selector: 'app-icons',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class ConsumerComponent implements OnInit {


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

  //ngOnInit() {
  //  this.getAllConsumer();
  //}
  ngOnInit(){
    this.getAllConsumer();
  
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }



  getAllConsumer() {
    this.MerchantService.getAllConsumer().subscribe(data => {
      //   this.allCategories = data
         this.sellers = this.tempSellers = data.consumer_list;
         this.totalRecords = this.tempTotalRecords = this.sellers.length;
       }); 
   
  }

  clickOnCouponDetail(id) {
    this.MerchantService.getCouponsConsumerId(id).subscribe((data: {}) => {
      this.allCoupons = data;
         this.dialog.open(DialogForConsumer, { data: this.allCoupons});
         
      
     });
             
  }

  warningDialog(id) {
    let dialogRef = this.dialog.open(warningDialogConsumer);
    dialogRef.afterClosed().subscribe(result  => {
     if (result == "true"){
       this.MerchantService.deleteConsumer(id).subscribe((data: {}) => { 
         window.location.reload();
       });
     }
     console.log(result);
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

/* code always on the bottom of page. **************************** */
@Component({
  selector: 'warning-dialog.consumer',
  templateUrl: 'warning-dialog.consumer.html',
})
export class warningDialogConsumer {}