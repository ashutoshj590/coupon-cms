import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MerchantService } from '../_services';

import { DialogEditCouponConsumer } from './edit-coupon.user';

@Component({
    selector: 'dialog-consumer',
    templateUrl: 'dialog-consumer.html',
  })
  export class DialogForConsumer implements OnInit {

  
    couponsForm = new FormGroup({
        name: new FormControl()
       });
   
       couponDetail: any = {};
       showSpinner = false;
    filterText = '';
    sellers = [];
    tempSellers = [];
    tempTotalRecords: number = 0;
    p: number = 1;
    totalRecords: number = 0;
    pageSize: number = 5;

    key: string = 'id';
    reverse: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private formBuilder: FormBuilder,
                          private MerchantService: MerchantService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
      this.sellers = this.tempSellers = this.data.coupon_detail;
      this.totalRecords = this.tempTotalRecords = this.sellers.length;
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
  


    deleteCoupon(id) {
      let dialogRef = this.dialog.open(warningDialogConsumerCoupon);
      dialogRef.afterClosed().subscribe(result  => {
       if (result == "true"){
         this.MerchantService.deleteCouponMerchant(id).subscribe((data: {}) => { 
           window.location.reload();
         });
       }
       console.log(result);
      });
     }


     clickEditCoupon(id) {
      this.MerchantService.getCouponDetail(id).subscribe((data: {}) => {
        this.couponDetail = data;
        this.dialog.open(DialogEditCouponConsumer, { data: this.couponDetail});
      });
       
  }

  filterData(event, type) {
    this.filterText = event.target.value;
    switch (type) {
      case 'coupon_code':
        this.tempSellers = this.sellers.filter(item =>
          item.coupon_code != null && item.coupon_code.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
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


  dropDownData(event, type) {
    this.filterText = event;
    switch (type) {
      case 'coupon_type':
        this.tempSellers = this.sellers.filter(item =>
          item.coupon_type != null && item.coupon_type.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
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
export class warningDialogConsumerCoupon {}



  