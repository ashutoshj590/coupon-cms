import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MerchantService } from '../_services';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'dialog-gallary',
    templateUrl: 'dialog-gallary.html',
  })
  export class DialogGallary implements OnInit {

   
    couponsForm = new FormGroup({
        name: new FormControl()
       });
   
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private formBuilder: FormBuilder,
                          private MerchantService: MerchantService,
                          public dialog: MatDialog,
                          private snackBar: MatSnackBar
                          
    ) {}

    ngOnInit(): void {
     
    }

    imgDelete(user_id, image_id) {
      this.MerchantService.deleteImg(user_id, image_id).subscribe((data: {}) => { 
        this.snackBar.open("Item Deleted Successfully!", "dismiss", {duration: 3000});
        window.location.reload();
      });
    }


   
  


  
}


  