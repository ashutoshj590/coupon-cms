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



  getAllConsumer() {
    this.MerchantService.getAllConsumer().subscribe((data: {}) => {
      this.allConsumer = data;
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


}

/* code always on the bottom of page. **************************** */
@Component({
  selector: 'warning-dialog.consumer',
  templateUrl: 'warning-dialog.consumer.html',
})
export class warningDialogConsumer {}