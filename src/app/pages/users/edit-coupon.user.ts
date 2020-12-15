import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';

@Component({
    selector: 'edit-coupon.user',
    templateUrl: 'edit-coupon.user.html',
  })
  export class DialogEditCouponConsumer implements OnInit {
   
    ischeckbox: boolean;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
      if (this.data.coupon_detail.flash_deal == 1){
        this.ischeckbox = true;
     } else {
       this.ischeckbox =  false;
     }


    }

 
  onSubmit(data){
    this.merchantService.editCouponDetailCustom(data).subscribe((data: {}) => {
        window.location.reload()
      });
  }



 

  
}


  