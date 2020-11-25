import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MerchantService } from '../_services';

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
                          private merchantService: MerchantService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
     

    }





 

  
}


  