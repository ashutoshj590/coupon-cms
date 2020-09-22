import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';


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
    private alertService: AlertService
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
    .subscribe((data: {}) => {
      this.userLoginData =  data;
      console.log("sucess");
      console.log(this.userLoginData);
      console.log(this.userLoginData.response_code)
      if (this.userLoginData.response_code === 200){
            this.returnUrl =  '/dashboard'
            this.router.navigate([this.returnUrl]);
            this.loading = false;
      }
      
    });
   
  } 
  

 

  

 
}