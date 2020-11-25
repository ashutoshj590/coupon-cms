import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    public dialog: MatDialog
    
  ) { }

  ngOnInit() {
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


}
