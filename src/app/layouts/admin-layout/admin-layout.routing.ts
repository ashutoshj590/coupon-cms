import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MerchantComponent } from '../../pages/merchant/merchant.component';
import { CategoryComponent } from '../../pages/category/category.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ConsumerComponent } from '../../pages/users/users.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { AuthGuard } from '../../pages/_helpers';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent },
    { path: 'users', canActivate: [AuthGuard], component: ConsumerComponent },
    { path: 'merchant', canActivate: [AuthGuard], component: MerchantComponent },
    { path: 'category', canActivate: [AuthGuard], component: CategoryComponent },
    { path: 'gallary', canActivate: [AuthGuard], component: RegisterComponent }
];

