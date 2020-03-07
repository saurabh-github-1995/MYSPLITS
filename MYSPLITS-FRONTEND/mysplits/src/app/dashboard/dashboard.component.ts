import { FirebaseService } from './../services/FIREBASE/firebase.service';
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
  message: any;
  constructor(
    public router:Router,
    public datasourceService: DatasourceService,
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    public serverEndpoints: ServerEndPointsService,
    public appComponent: AppComponent,
    public messagingService:FirebaseService
    ) { }

  ngOnInit() {
    this.showSelectedTab("dashboard");
    this.loggedInUserName = localStorage.getItem("LOGGED_IN_USER_NAME");
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    this.messagingService.receiveMessage();
    console.log(this.message);
    //this.sendNotification();
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
  sendNotification() {
    this.appComponent.showLoader();

    let postBody ={
      "to" : "d_7WjhhY-uDL8DXw5KE9yg:APA91bGYIPDBlwgzU97xXIih1MHzNJQiO7ETqCd0a7Rb7plwF3kgO3NRyj3kfsPgVefhVvtFSE5WYdIuSchqYJ6l55NnZ_maWE_NKEzEjOOLW3MEtwOE0vj6_cr3H6gLTP96lTEqLpag",
      "collapse_key" : "type_a",
      "notification" : {
          "body" : "Body of Your Notification",
          "title": "Title of Your Notification"
      },
      "data" : {
          "body" : "Body of Your Notification in Data",
          "title": "Title of Your Notification in Title",
          "key_1" : "Value for key_1",
          "key_2" : "Value for key_2"
      }
     }
    console.log(this.serverEndpoints.SERVERURL)
    let header = {

        'Authorization': 'key=AIzaSyDw-INCBSFpwU-Syo0awjzFCruiWs8u_7M',
        'Content-Type': 'application/json'

    }
    this.httpClient.post("https://fcm.googleapis.com/fcm/send", postBody, { headers: header }).subscribe((response: any) => {

      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        //this.loggedInUser = response.resultSet.appUser;
        //this.loggedInUserSession = response.resultSet.session;
        let user = response.resultSet;
        localStorage.setItem(this.serverEndpoints.LOGGED_IN_USER_SEESION_ID, user.session_id);
        localStorage.setItem(this.serverEndpoints.LOGGED_IN_USER_NAME, user.full_name);
        localStorage.setItem(this.serverEndpoints.LOGGED_IN_USER_ID, user.id);
        //localStorage
        this.appComponent.hideLoader();
        this.router.navigate(['/dashboard/groups']);
      } else {
        //alert("SPMETHING WENT WRONG");
        this.appComponent.hideLoader();
        this.appComponent.getSpecificError(response.operationStatus);
      }

    }, (error: Response) => {
      this.appComponent.hideLoader();
      alert("SPMETHING WENT WRONG**");
      if (error.status === 404) {
        console.log('Wrong url');
      } else if (error.status === 400) {
      }
    });

  }


}
//
