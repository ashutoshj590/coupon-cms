import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ResetPassword } from '../login/reset-password';


@Component({
    selector: 'dialog-forgot',
    templateUrl: 'dialog-forgot.html',
  })
  export class DialogForgotPassword implements OnInit {
    
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog,
                          private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
    
     

    }

    

 
    onSubmit(data){
      this.merchantService.forgotPassword(data).subscribe(data => {
        if(data.response_code === 200){
      //  this.snackBar.open("Password Change Successfully!", "dismiss", {duration: 3000});
      //  window.location.reload();
      this.dialog.open(ResetPassword, {});
        } else {
         // this.snackBar.open(data.response_message, "dismiss", {duration: 3000});
         console.log("Data not found!");
        }
         });
    }


 

  
}


  