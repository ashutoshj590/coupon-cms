import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MerchantService } from '../_services';

import { DialogEditCoupon } from './edit-coupon';

@Component({
    selector: 'dialog-coupon',
    templateUrl: 'dialog-coupon.html',
  })
  export class DialogForCoupon implements OnInit {

    couponsForm = new FormGroup({
        name: new FormControl()
       });
       couponDetail: any = {};



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
    
    
    }

    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }


    deleteCoupon(id) {
      let dialogRef = this.dialog.open(warningDialogCoupon);
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
        this.dialog.open(DialogEditCoupon, { data: this.couponDetail});
      });
       
  }


  filterData(event, type) {
    this.filterText = event.target.value;
    switch (type) {
      case 'short_name':
        this.tempSellers = this.sellers.filter(item =>
          item.short_name != null && item.short_name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
      case 'coupon_type':
        this.tempSellers = this.sellers.filter(item =>
          item.coupon_type != null && item.coupon_type.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
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

 

  
}

/* code always on the bottom of page. **************************** */
@Component({
  selector: 'warning-dialog.component',
  templateUrl: 'warning-dialog.component.html',
})
export class warningDialogCoupon {}


  