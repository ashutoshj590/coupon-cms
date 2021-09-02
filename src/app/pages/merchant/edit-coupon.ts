import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';

@Component({
    selector: 'edit-coupon',
    templateUrl: 'edit-coupon.html',
  })
  export class DialogEditCoupon implements OnInit {
   
    ischeckbox: boolean;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
      console.log("detail of coupon");
      console.log(this.data.coupon_detail);
      if (this.data.coupon_detail.flash_deal == 1){
        this.ischeckbox = true;
     } else {
       this.ischeckbox =  false;
     }


    }

 
  onSubmit(data){
    this.merchantService.editCouponDetail(data).subscribe((data: {}) => {
          window.location.reload()
      });
  }



 

  
}


  