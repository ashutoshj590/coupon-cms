import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { CategoryService } from '../_services';

@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'dialog-data-example-dialog.html',
  })
  export class DialogDataExampleDialog implements OnInit {
   // subCategoryForm: FormGroup;
   // subCategoryId: any;
   subCategoryForm = new FormGroup({
    name: new FormControl()
   });
   submitted = false;
   subCategoryId: any;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private formBuilder: FormBuilder,
                          private categoryService: CategoryService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
      this.subCategoryForm = this.formBuilder.group({
        name: ['', Validators.required],
    });

    }

    get f() { return this.subCategoryForm.controls; }


  addSubCate() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.subCategoryForm.invalid) {
        return;
      }
         
    let category_id = this.data.category_id;
    this.subCategoryId = {category_id, name: this.f.name.value}; 
    this.categoryService.addSubCategory(this.subCategoryId).subscribe((data: {}) => {
      //  this.router.navigate(['/food/types']);
        window.location.reload()
       console.log("sub cate added..")
    });
  }



 /* deleteSubCatConfirm(id) {
    this.categoryService.deleteSubCategory(id).subscribe((data: {}) => {
      window.location.reload()
      });
  }  */


  deleteSubCatConfirm(id) {
    let dialogRef = this.dialog.open(warningDialogSubCate);
    dialogRef.afterClosed().subscribe(result  => {
     if (result == "true"){
       this.categoryService.deleteSubCategory(id).subscribe((data: {}) => { 
         window.location.reload();
       });
     }
     console.log(result);
    });
   }
  
   selectedFile = null;
   onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
   }


  
}

/* code always on the bottom of page. **************************** */
@Component({
  selector: 'warning-dialog-sub-cate',
  templateUrl: 'warning-dialog-sub-cate.html',
})
export class warningDialogSubCate {}

  
  