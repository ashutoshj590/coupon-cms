import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MerchantComponent } from '../../pages/merchant/merchant.component';
import { CategoryComponent } from '../../pages/category/category.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/users/users.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'users',         component: TablesComponent },
    { path: 'merchant',       component: MerchantComponent },
    { path: 'category',   component: CategoryComponent },
];
