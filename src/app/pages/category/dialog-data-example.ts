import { Component, OnInit, Inject,ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { CategoryService } from '../_services';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-icons',
    templateUrl: './dialog-data-example-dialog.html'
  })


  
  export class DialogDataExampleDialog implements OnInit {
    
    @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
    fileUploadForm: FormGroup;
    fileInputLabel: string;

  
   submitted = false;
   subCategory: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                          private formBuilder: FormBuilder,
                          private categoryService: CategoryService,
                          public dialog: MatDialog,
                          private http: HttpClient,
                          private snackBar: MatSnackBar
    ) {
     
    }

    ngOnInit(): void {
      this.fileUploadForm = this.formBuilder.group({
        uploadedImage: ['']
      });
    }


    onFileSelect(event) {
      console.log(event);
      const file = event.target.files[0];
      this.fileInputLabel = file.name;
      this.fileUploadForm.get('uploadedImage').setValue(file);
    }
  
  
    onFormSubmit() {
     console.log("it works!");
      if (!this.fileUploadForm.get('uploadedImage').value) {
        console.log('Please fill valid details!');
        return false;
      }
      const formData = new FormData();
      formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
      this.http.post<any>('https://www.mccpapp.com:8080/category/file', formData).subscribe(response => {
          console.log(response);
          if (response.response_code === 200) {
            // Reset the file input
            this.snackBar.open("Service Uploaded Successfully!", "dismiss", {duration: 3000});
            this.uploadFileInput.nativeElement.value = "";
            this.fileInputLabel = undefined;
            window.location.reload()
          }
        }, er => {
          console.log(er);
        }); 
    } 

  


  
}


  
  