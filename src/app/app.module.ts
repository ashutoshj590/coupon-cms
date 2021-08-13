import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtInterceptor, ErrorInterceptor} from './pages/_helpers';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MerchantComponent } from './pages/merchant/merchant.component';
import { CategoryComponent } from './pages/category/category.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConsumerComponent } from './pages/users/users.component';
import { warningDialogComponent } from './pages/category/category.component';
import { warningDialogMerchant } from './pages/merchant/merchant.component';
import { warningDialogConsumer } from './pages/users/users.component';
import { warningDialogCoupon } from './pages/merchant/dialog-coupon';
import {DialogDataExampleDialog} from './pages/category/dialog-data-example';
import {DialogForCoupon} from './pages/merchant/dialog-coupon';
import {DialogEdit} from './pages/merchant/dialog-edit'; 
import {DialogAdd} from './pages/merchant/dialog-add';
import {DialogAddUser} from './pages/users/dialog-addUser';
import {DialogResetPassword} from './pages/merchant/dialog-reset';
import {UserResetPassword} from './pages/users/dialog-resetUser';
import {DialogEditCoupon} from './pages/merchant/edit-coupon';
import {DialogEditCouponConsumer} from './pages/users/edit-coupon.user';
import {DialogForConsumer} from './pages/users/dialog-consumer';
import {warningDialogConsumerCoupon} from './pages/users/dialog-consumer';
import {DialogGallary} from './pages/register/dialog-gallary';
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule  } from '@angular/material/icon';
import {  MatTreeModule  } from '@angular/material/tree';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule  } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { OrderModule } from 'ngx-order-pipe';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserModule,
    CommonModule,
    FileUploadModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxPaginationModule,
    OrderModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
    DashboardComponent,
    MerchantComponent,
    CategoryComponent,
    ConsumerComponent,
    DialogDataExampleDialog,
    warningDialogComponent,
    DialogForCoupon,
    DialogForConsumer,
    DialogGallary,
    warningDialogMerchant,
    DialogEdit,
    DialogAdd,
    DialogAddUser,
    DialogResetPassword,
    UserResetPassword,
    warningDialogCoupon,
    DialogEditCoupon,
    warningDialogConsumerCoupon,
    DialogEditCouponConsumer,
    warningDialogConsumer,
    RegisterComponent,
    UserProfileComponent

  ],
 providers: [
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
