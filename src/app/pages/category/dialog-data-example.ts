import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'dialog-data-example-dialog.html',
  })
  export class DialogDataExampleDialog implements OnInit {
      
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {

    }
  
  }
  
  