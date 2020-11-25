import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CategoryService } from '../_services';

@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'dialog-data-example-dialog.html',
  })
  export class DialogDataExampleDialog implements OnInit {
   subCategoryForm: FormGroup;
  /* subCategoryForm = new FormGroup({
    name: new FormControl(),
    subcateimg: new FormControl()

   }); */
   submitted = false;

   subCategory: any;
   images;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private formBuilder: FormBuilder,
                          private categoryService: CategoryService,
                          public dialog: MatDialog
    ) {}

    ngOnInit() {
      this.subCategoryForm = this.formBuilder.group({
        name: ['', Validators.required],
        subcateimg: ['']
    });

    }

   // get f() { return this.subCategoryForm.controls; }
 get name() { return this.subCategoryForm.get('name'); }


  onFileSelected(event) {
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.subCategoryForm.get('subcateimg').setValue(file);
    }
   
  }

  


 /* addSubCate() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.subCategoryForm.invalid) {
        return;
      }
    const formData = new FormData();
    let category_id = this.data.category_id;
    formData.append('category_id', category_id,);
    formData.append('name', this.subCategoryForm.get('name').value);
    formData.append('subcateimg', this.subCategoryForm.get('subcateimg').value);
    this.categoryService.addSubCategory(formData).subscribe((data: {}) => {
      console.log("//////");
      console.log(data);
        window.location.reload()
       console.log("sub cate added..")
    });
  } */
  addSubCate() {
    console.log("form value");
    console.log(this.subCategoryForm.value);
  }


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

  
   


  
}

/* code always on the bottom of page. **************************** */
@Component({
  selector: 'warning-dialog-sub-cate',
  templateUrl: 'warning-dialog-sub-cate.html',
})
export class warningDialogSubCate {}

  
  