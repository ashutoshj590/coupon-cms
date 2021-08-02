import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
//import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
//import { MerchantComponent } from '../../pages/merchant/merchant.component';
//import { CategoryComponent } from '../../pages/category/category.component';
//import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
//import { TablesComponent } from '../../pages/users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { BrowserModule } from '@angular/platform-browser';
//import { CommonModule } from '@angular/common';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    RouterModule.forChild(AdminLayoutRoutes),
    HttpClientModule,
    NgbModule,
    ClipboardModule
  //  BrowserModule
   // CommonModule
  ],
  declarations: [
   // DashboardComponent,
  //  UserProfileComponent,
   // TablesComponent,
   // MerchantComponent,
   // CategoryComponent
  ]
})

export class AdminLayoutModule {}
