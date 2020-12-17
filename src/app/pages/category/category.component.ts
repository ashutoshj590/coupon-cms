import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, CategoryService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

//import { DialogDataExampleDialog } from './dialog-data-example'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})


export class CategoryComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

 
    allCategories: any = [];
    allSubCategories: any = [];

    filterText = '';
    sellers = [];
    tempSellers = [];
    tempTotalRecords: number = 0;
    p: number = 1;
    totalRecords: number = 0;
    pageSize: number = 5;

    key: string = 'id';
    reverse: boolean = false;


    categoryForm: FormGroup;

    categoryId: any;
    submitted = false;
    allCategory: any;
    
    constructor(
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private router: Router,
        private http: HttpClient,
        
      ) { }


        
      ngOnInit() {
        this.getAllCategory();
        this.getSubCategory();

        this.categoryForm = this.formBuilder.group({
          name: ['', Validators.required]
       });

       this.fileUploadForm = this.formBuilder.group({
        subcateimg: [''],
        name: [''],
        category_id: ['']
      });
      }

      get f() { return this.categoryForm.controls; }
      get fu() { return this.fileUploadForm.controls; }

      sort(key){
        this.key = key;
        this.reverse = !this.reverse;
      }
    

      addNewCategory() {
     //   this.SpinnerService.show();
        this.submitted = true;
        // stop here if form is invalid
        if (this.categoryForm.invalid) {
          return;
        }
          
      this.categoryId = {name: this.f.name.value}; 
      this.categoryService.addNewCategory(this.categoryId).subscribe((data: {}) => {
        window.location.reload()
       // this.SpinnerService.hide();
      });
    }
  
    
    onFileSelect(event) {
      console.log(event);
      const file = event.target.files[0];
      this.fileInputLabel = file.name;
      this.fileUploadForm.get('subcateimg').setValue(file);
    }
  
    onFormSubmit() {
  
     /* if (!this.fileUploadForm.get('subcateimg').value) {
        console.log('Please fill valid details!');
        return false;
      } */
  
      const formData = new FormData();
      formData.append('subcateimg', this.fileUploadForm.get('subcateimg').value);
      formData.append('name', this.fu.name.value);
      formData.append('category_id', this.fu.category_id.value);
      this.http
        .post<any>('https://www.mccpapp.com:8080/category/add-sub-category', formData).subscribe(response => {
          console.log(response);
          if (response.statusCode === 200) {
            // Reset the file input
            this.uploadFileInput.nativeElement.value = "";
            this.fileInputLabel = undefined;
          }
        }, er => {
          console.log(er);
        
        });
        window.location.reload()
    }
  

    
  
  /* clickSubCategory(id) {
      this.categoryService.getSubCategory(id).subscribe((data: {}) => {
       this.allSubCategories = data;
       console.log("data for category_id");
       console.log(data);
        this.dialog.open(DialogDataExampleDialog, { data: this.allSubCategories});
       
      });
      
    } */


    getSubCategory() {
      this.categoryService.getSubCategory().subscribe(data => {
      // this.allSubCategories = data;
       this.sellers = this.tempSellers = data.subCategories;
         this.totalRecords = this.tempTotalRecords = this.sellers.length;
       }); 
      
    }
    
    getAllCategory() {
      this.categoryService.getAllCategory().subscribe((data: {}) => {
        this.allCategories = data;
      });
     
    }


    
    deleteSubCatConfirm(id) {
      let dialogRef = this.dialog.open(warningDialogComponent);
      dialogRef.afterClosed().subscribe(result  => {
       if (result == "true"){
         this.categoryService.deleteSubCategory(id).subscribe((data: {}) => { 
           window.location.reload();
         });
       }
       console.log(result);
      });
     }
    

     changeStatus(id) {
      this.categoryService.statusForCategory(id).subscribe((data: {}) => {
        this.allCategory = data;
        window.location.reload()
      });
     
    }



    filterData(event, type) {
      this.filterText = event.target.value;
      switch (type) {
        case 'category':
          this.tempSellers = this.sellers.filter(item =>
            item.category_name != null && item.category_name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
          );
          this.tempTotalRecords = this.tempSellers.length;
          break;
        case 'subcategory':
          this.tempSellers = this.sellers.filter(item =>
            item.name != null && item.name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
          );
          this.tempTotalRecords = this.tempSellers.length;
          break;
          case 'date':
            this.tempSellers = this.sellers.filter(item =>
              item.createdAt != null && item.createdAt.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
            );
            this.tempTotalRecords = this.tempSellers.length;
            break;
    
      }
      if(this.filterText.length == 0) {
        this.tempSellers = this.sellers;
        this.tempTotalRecords = this.tempSellers.length;
      }
      this.p = 1;
    }


     


}
/* code always on the bottom of page. **************************** */
@Component({
  selector: 'warning-dialog.component',
  templateUrl: 'warning-dialog.component.html',
})
export class warningDialogComponent {}







  



  


