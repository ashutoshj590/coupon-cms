import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
    selector: 'reset-password',
    templateUrl: 'reset-password.html',
  })
  export class ResetPassword implements OnInit {
    
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog,
                          private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
    
     

    }

    

 
    onSubmit(data){
      this.merchantService.resetPassword(data).subscribe(data => {
        if(data.response_code === 200){
       this.snackBar.open("Password Reset Successfully!", "dismiss", {duration: 3000});
       window.location.reload();
        } else {
          this.snackBar.open(data.response_message, "dismiss", {duration: 3000});
        }
         });
    }


 

  
}


  