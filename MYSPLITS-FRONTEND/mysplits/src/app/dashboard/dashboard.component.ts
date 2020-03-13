import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServerEndPointsService } from 'src/app/services/SERVERENDPOINTS/server-end-points.service';
import { DatasourceService } from '../services/DATASOURCE/datasource.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DASHBOARDComponent implements OnInit {
  loggedInUserName;
  shares: any;
  constructor(
    public router:Router,
    public datasourceService: DatasourceService,
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    public serverEndpoints: ServerEndPointsService,
    public appComponent: AppComponent
    ) { }

  ngOnInit() {
    this.showSelectedTab("dashboard");
    this.loggedInUserName = localStorage.getItem("LOGGED_IN_USER_NAME");
  }

  navigateToGroups(){

    this.router.navigate(['/dashboard/groups']);
  }

  navigateToInvites(){
    this.router.navigate(['/dashboard/invites']);
  }
  navigateToDashboard(){
    this.showSelectedTab("dashboard");
    this.router.navigate(['/dashboard/home']);
  }

  currentSelected;
  showSelectedTab(tabId){
    $("#"+this.currentSelected).css("background-color","transparent");
    this.currentSelected = tabId;

    $("#"+tabId).css("background-color","#a4a9ab");

  }
  navigateToLogin(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleSidebar(){
    $("#sidebar").toggle('slow');
    $(".top-navbar").toggleClass("padding-left");
  }

}
//
