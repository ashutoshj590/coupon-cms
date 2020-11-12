import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-icons',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  allMerchants: any = [];
  public copy: string;



  constructor(
    private MerchantService: MerchantService,
    private formBuilder: FormBuilder
    
  ) { }

  ngOnInit() {
    this.getAllMerchant();
  }




  getAllMerchant() {
    this.MerchantService.getAllMerchant().subscribe((data: {}) => {
      this.allMerchants = data;
    });
   
  }
}
