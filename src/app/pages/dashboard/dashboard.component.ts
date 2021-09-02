import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../_services';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  alldata: any = [];
  showSpinner = false;

  constructor(
    private categoryService: CategoryService
    
  ) { }

  ngOnInit() {
    this.getAllCountsForAdmin();
    this.loadData();
    
  }


  getAllCountsForAdmin() {
    this.categoryService.getAllCounts().subscribe((data: {}) => {
      this.alldata = data;
    });
   
  }


  loadData() {
    this.showSpinner = true;
    setTimeout(()=> {
      this.showSpinner = false;
    }, 1000);
  }




  

}
