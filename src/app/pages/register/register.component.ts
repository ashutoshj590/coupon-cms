import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { DialogGallary } from './dialog-gallary';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  merchantDe: any = {};
  allImages: any = [];
  public copy: string;
  coupon_detail: any;


    
    userId: any;

    key: string = 'id';
    reverse: boolean = false;

  constructor(
    private MerchantService: MerchantService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllMerchant(this.router.snapshot.params.id);

    this.fileUploadForm = this.formBuilder.group({
      images: [''],
      user_id: ['']
    });
  }


 getAllMerchant(id) {
    this.MerchantService.merchantDetail(id).subscribe(data => {
        this.merchantDe = data.merchant_detail;
       
       }); 
  }
  
 

  clickOnGallary(id) {
    this.MerchantService.getImagesById(id).subscribe((data: {}) => {
      this.allImages = data;
      this.dialog.open(DialogGallary, { data: this.allImages});
    });
             
  }

  //get fu() { return this.fileUploadForm.controls; }


  clickOnUserId(id){
    this.userId = id;
  }

  



  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('images').setValue(file);
  }


  onFormSubmit() {
    if (!this.fileUploadForm.get('images').value) {
      console.log('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('images', this.fileUploadForm.get('images').value);
    formData.append('user_id', this.userId);
    this.http.post<any>('https://www.mccpapp.com:8080/user/uplaod-image', formData).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
      });
     // window.location.reload()
  }


 



  


}
