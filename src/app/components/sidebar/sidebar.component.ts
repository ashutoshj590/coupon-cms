import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../pages/_services';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/coupons', title: 'Coupons',  icon:'ni-tag text-blue', class: '' },
  //  { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/request-detail', title: 'Requests',  icon:'ni-planet text-purple', class: '' },
   // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    //{ path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
   { path: '/users', title: 'User Details',  icon:'ni-single-02 text-red', class: '' },
    { path: '/merchant', title: 'Merchant Details',  icon:'ni-key-25 text-info', class: '' },
   { path: '/category', title: 'Category Details',  icon:'ni-circle-08 text-pink', class: '' },
  // { path: '/gallary', title: 'Merchant Gallary',  icon:'ni-single-02 text-red', class: '' }

   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authenticationService: AuthenticationService,) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
