import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, MerchantService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-icons',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class ConsumerComponent implements OnInit {
  allConsumer: any = [];
  public copy: string;



  constructor(
    private MerchantService: MerchantService,
    private formBuilder: FormBuilder
    
  ) { }

  ngOnInit() {
    this.getAllConsumer();
  }




  getAllConsumer() {
    this.MerchantService.getAllConsumer().subscribe((data: {}) => {
      this.allConsumer = data;
    });
   
  }
}
