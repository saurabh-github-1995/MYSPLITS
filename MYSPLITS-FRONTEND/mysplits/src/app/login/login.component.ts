import { ServerEndPointsService } from './../services/SERVERENDPOINTS/server-end-points.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;

  constructor(
    public httpClient: HttpClient,
    public serverEndpoints:ServerEndPointsService) { }

  ngOnInit() {
  }

  loginUser(){

    let postBody = {
      "user_name":this.username,
      "password":this.password
    }
    console.log(this.serverEndpoints.SERVERURL)
    let header={}
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.LOGINUSER, postBody, header).subscribe((response: any) => {

      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        //this.loggedInUser = response.resultSet.appUser;
        //this.loggedInUserSession = response.resultSet.session;
        let user=response.resultSet;
        localStorage.setItem(this.serverEndpoints.LOGGED_IN_USER_SEESION_ID,user.session_id);
        localStorage.setItem(this.serverEndpoints.LOGGED_IN_USER_NAME,user.full_name);
        localStorage.setItem(this.serverEndpoints.LOGGED_IN_USER_ID,user.id);
      } else {
        alert("SPMETHING WENT WRONG");
        //this.customhttpService.getSpecificError(response.operationStatus);
      }

    }, (error: Response) => {
      alert("SPMETHING WENT WRONG**");
      if (error.status === 404) {
        console.log('Wrong url');
      } else if (error.status === 400) {
      }
    });

  }


}
