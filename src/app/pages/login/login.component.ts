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
      email: ['ashutoshj590@gmail.com', Validators.required],
      password: ['9460482961', Validators.required],
      type: ['admin', Validators.required],
      device_type: ['apple', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl =  'dashboard'//this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log(this.f.email);
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // // stop here if form is invalid
     if (this.loginForm.invalid) {
       return;
    }

    console.log(this.f.email);
    
    this.returnUrl =  '/dashboard'
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value, this.f.type.value, this.f.device_type.value)
    .subscribe(data => {
     // this.getUser();
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
    this.router.navigate([this.returnUrl]);
    this.loading = false; 
  } 

  

  /*getUser() {
    this.authenticationService.getUser().subscribe(data => {
      console.log(data,'Data');
      if(data.user_type == 'admin') {
        this.router.navigate([this.returnUrl]);
      } else {
        this.getUserRoles(data.id);
      }
    });
  } 

  getUserRoles(id) {
    this.authenticationService.getUserRoles(id).subscribe(data => {
      this.router.navigate([this.returnUrl]);
    });
  } */
}