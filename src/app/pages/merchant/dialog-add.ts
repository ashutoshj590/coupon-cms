import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';

@Component({
    selector: 'dialog-add',
    templateUrl: 'dialog-add.html',
  })
  export class DialogAdd implements OnInit {
    
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
    
     

    }

    

 
  onSubmit(data){
    this.merchantService.addMerchantDetail(data).subscribe((data: {}) => {
          window.location.reload()
      });
  }



 

  
}


  