import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DASHBOARDComponent implements OnInit {
  loggedInUserName;
  constructor(
    public router:Router) { }

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
    this.router.navigate(['/dashboard']);
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
}
