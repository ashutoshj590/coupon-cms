import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtInterceptor, ErrorInterceptor} from './pages/_helpers';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MerchantComponent } from './pages/merchant/merchant.component';
import { CategoryComponent } from './pages/category/category.component';
import { ConsumerComponent } from './pages/users/users.component';
import { warningDialogComponent } from './pages/category/category.component';
import { warningDialogSubCate } from './pages/category/dialog-data-example';
import {DialogDataExampleDialog} from './pages/category/dialog-data-example';
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule  } from '@angular/material/icon';
import {  MatTreeModule  } from '@angular/material/tree';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    BrowserAnimationsModule,
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
    BrowserModule,
    CommonModule,
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
    warningDialogSubCate

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
