import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';

@Component({
    selector: 'dialog-resetUser',
    templateUrl: 'dialog-resetUser.html',
  })
  export class UserResetPassword implements OnInit {
    
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
    
     

    }

    

 
  onSubmit(data){
    this.merchantService.resetPassMerchant(data).subscribe((data: {}) => {
          window.location.reload()
      });
  }



 

  
}


  