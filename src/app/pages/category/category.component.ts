import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, CategoryService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { DialogDataExampleDialog } from './dialog-data-example'



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})



export class CategoryComponent implements OnInit {
    allCategories: any = [];
    allSubCategories: any = [];
 
    

    categoryForm: FormGroup;
    
    
    categoryId: any;
    submitted = false;

    
    constructor(
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog
        
      ) { }


        
      ngOnInit() {
        this.getAllCategory();
        

        this.categoryForm = this.formBuilder.group({
          name: ['', Validators.required],
      });
      }

      get f() { return this.categoryForm.controls; }

      addNewCategory() {
        this.submitted = true;
    
    
        // stop here if form is invalid
        if (this.categoryForm.invalid) {
          return;
        }
        
        
      this.categoryId = {name: this.f.name.value}; //, "status": 1
      this.categoryService.addNewCategory(this.categoryId).subscribe((data: {}) => {
        //  this.router.navigate(['/food/types']);
          window.location.reload()
      });
    }
  
    
      getAllCategory() {
        this.categoryService.getAllCategory().subscribe((data: {}) => {
          this.allCategories = data;
        });
       
      }



   /* warningDialog(id) {
      this.categoryService.deleteCategory(id).subscribe((data: {}) => {
        window.location.reload()
        });
    } */
    
  
    clickSubCategory(id) {
      this.categoryService.getSubCategory(id).subscribe((data: {}) => {
       this.allSubCategories = data;
          this.dialog.open(DialogDataExampleDialog, { data: this.allSubCategories});
          
       
      });
      
    }

    warningDialog(id) {
     let dialogRef = this.dialog.open(warningDialogComponent);
     dialogRef.afterClosed().subscribe(result  => {
      if (result == "true"){
        this.categoryService.deleteCategory(id).subscribe((data: {}) => { 
          window.location.reload();
        });
      }
      console.log(result);
     });
    }


     


}
/* code always on the bottom of page. **************************** */
@Component({
  selector: 'warning-dialog.component',
  templateUrl: 'warning-dialog.component.html',
})
export class warningDialogComponent {}







  



  


