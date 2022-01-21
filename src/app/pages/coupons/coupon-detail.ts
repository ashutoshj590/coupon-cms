import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';

@Component({
    selector: 'coupon-detail',
    templateUrl: 'coupon-detail.html',
  })
  export class CouponDetail implements OnInit {
    
    ischeckbox: boolean;
    categoryDetail: any;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
    
     

    }

    

 
 

  


 

  
}


  