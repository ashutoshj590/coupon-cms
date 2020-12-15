import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';

@Component({
    selector: 'dialog-edit',
    templateUrl: 'dialog-edit.html',
  })
  export class DialogEdit implements OnInit {
    
    ischeckbox: boolean;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
    
      if (this.data.merchant_detail.notification_email == 1){
         this.ischeckbox = true;
      } else {
        this.ischeckbox =  false;
      }

    }

    

 
  onSubmit(data){
    this.merchantService.editMerchantDetail(data).subscribe((data: {}) => {
          window.location.reload()
      });
  }



 

  
}


  