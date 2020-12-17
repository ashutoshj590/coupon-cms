import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as _ from 'lodash';

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

  allMerchants: any = [];
  allImages: any = [];
  public copy: string;


    filterText = '';
    sellers = [];
    tempSellers = [];
    tempTotalRecords: number = 0;
    p: number = 1;
    totalRecords: number = 0;
    pageSize: number = 10;
    userId: any;

    key: string = 'id';
    reverse: boolean = false;

  constructor(
    private MerchantService: MerchantService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllMerchant();

    this.fileUploadForm = this.formBuilder.group({
      images: [''],
      user_id: ['']
    });
  }


  getAllMerchant() {
    this.MerchantService.getAllMerchant().subscribe(data => {
      //   this.allCategories = data
         this.sellers = this.tempSellers = data.merchant_list;
         this.totalRecords = this.tempTotalRecords = this.sellers.length;
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

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
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


  filterData(event, type) {
    this.filterText = event.target.value;
    switch (type) {
      case 'business_name':
        this.tempSellers = this.sellers.filter(item =>
          item.business_name != null && item.business_name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
        );
        this.tempTotalRecords = this.tempSellers.length;
        break;
      case 'email':
        this.tempSellers = this.sellers.filter(item =>
          item.email != null && item.email.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 
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
