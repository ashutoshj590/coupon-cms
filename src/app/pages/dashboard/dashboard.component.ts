import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../_services';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  alldata: any = [];
 

  constructor(
    private categoryService: CategoryService
    
  ) { }

  ngOnInit() {
    this.getAllCountsForAdmin();
  
    
  }


  getAllCountsForAdmin() {
    this.categoryService.getAllCounts().subscribe((data: {}) => {
      this.alldata = data;
    });
   
  }


  

}
