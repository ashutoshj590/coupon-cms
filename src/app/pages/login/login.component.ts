import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlertService, AuthenticationService } from '../_services';
import {MatDialog} from '@angular/material/dialog';
import { DialogResetPassword } from '../merchant/dialog-reset';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  // userRoles: any;
   userLoginData: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      type: ['admin', Validators.required],
      device_type: ['apple', Validators.required]
    });

    // get return url from route parameters or default to '/'
   // this.returnUrl =  'dashboard'//this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log(this.f.email);

    this.submitted = true;
     if (this.loginForm.invalid) {
       return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value, this.f.type.value, this.f.device_type.value)
    .subscribe(data => {
      if(data.response_code === 200){
        if (data.user_Detail.type === "admin"){
          this.snackBar.open("logged In Successfully!", "dismiss", {duration: 3000});
          this.returnUrl =  '/dashboard'
          this.router.navigate([this.returnUrl]);
          this.loading = false;
        } else {
            this.snackBar.open("Please Login with Admin Credentials", "dismiss", {duration: 3000});
            
        }
     
      } else {
        this.snackBar.open(data.response_message.response, "dismiss", {duration: 3000});
      }
       });
   
  } 


 /* getAllMerchant(id) {
    this.MerchantService.merchantDetail(id).subscribe(data => {
        this.merchantDe = data.merchant_detail;
        this.categoryDetail = data.merchant_detail.category_detail;
        this.couponCounts = data.merchant_detail.coupon_detail;
      
       
       }); 
  } */
  clickReset() {
    this.dialog.open(DialogResetPassword, {});
   
}

 

  

 
}