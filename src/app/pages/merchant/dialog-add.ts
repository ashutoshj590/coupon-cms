import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MerchantService } from '../_services';
import {FormControl} from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
    selector: 'dialog-add',
    templateUrl: 'dialog-add.html',
  })
  export class DialogAdd implements OnInit {
    
    ischeckbox: boolean;
    usersDetail: any;
    categoryDetail: any;
    multipleData: any;

   
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private merchantService: MerchantService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
    this.getAllConsumer();
    this.getcategories();

    }

    

 
  onSubmit(data){
    this.multipleData = data.sub_category_id
    data.sub_category_id = data.sub_category_id.toString();
    this.merchantService.addMerchantDetail(data).subscribe((data: {}) => {
          window.location.reload()
      });
  }

  getAllConsumer() {
    this.merchantService.getAllConsumer().subscribe(data => {
         this.usersDetail = data.consumer_list
       
        
       }); 
   
  }


  getcategories() {
    this.merchantService.getAllcategory().subscribe(data => {
         this.categoryDetail = data.category_data
        
       }); 
   
  }


 



 

  


}


  