import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'dialog-addUser',
    templateUrl: 'dialog-addUser.html',
  })
  export class DialogAddUser implements OnInit {
    
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog,
                          private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
    

    }

    

 
  onSubmit(data){
    console.log(data);
    this.merchantService.addUserDetail(data).subscribe(data => {
      if(data.response_code === 200){
      this.snackBar.open("User added Successfully!", "dismiss", {duration: 3000});
       window.location.reload()
      } else if (data.response_code === 403) {
        this.snackBar.open(data.response_message.response, "dismiss", {duration: 3000});
       // window.location.reload()
      }
      });
  }



 

  
}


  