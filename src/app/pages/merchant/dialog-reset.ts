import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
    selector: 'dialog-reset',
    templateUrl: 'dialog-reset.html',
  })
  export class DialogResetPassword implements OnInit {
    
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog,
                          private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
    
     

    }

    

 
    onSubmit(data){
      this.merchantService.resetPassMerchant(data).subscribe(data => {
        if(data.response_code === 200){
        this.snackBar.open("Password Change Successfully!", "dismiss", {duration: 3000});
        window.location.reload();
        } else {
          this.snackBar.open(data.response_message, "dismiss", {duration: 3000});
        }
         });
    }


 

  
}


  