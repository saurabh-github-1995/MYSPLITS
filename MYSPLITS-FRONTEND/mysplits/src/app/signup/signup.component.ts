import { HttpClient } from '@angular/common/http';
import { ServerEndPointsService } from './../services/SERVERENDPOINTS/server-end-points.service';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  local_error_message: string;

  constructor(public appComponent: AppComponent,
    public serverEndpoints: ServerEndPointsService,
    public httpClient: HttpClient) { }

  username;
  password;
  cnfrm_password;
  email;
  fullname;
  ngOnInit() {
  }


  signup() {

    if (this.fullname == null || this.fullname == "" || this.fullname == undefined) {

      this.local_error_message = "Please Enter the fullname";

    } else if (this.username == null || this.username == "" || this.username == undefined) {
      this.local_error_message = "Please Enter the username";
    } else if (this.email == null || this.email == "" || this.email == undefined) {
      this.local_error_message = "Please Enter the email id";
    } else if (this.cnfrm_password != this.password || this.password == undefined || this.password == ""
      || this.password == null || this.cnfrm_password == undefined || this.cnfrm_password == ""
      || this.cnfrm_password == null) {
      this.local_error_message = "Please enter the same pasword in passowrd fields";

    } else {
      this.local_error_message = "";
      this.appComponent.showLoader();

      let postBody = {
        "user_name": this.username,
        "password": this.password,
        "full_name": this.fullname,
        "email": this.email
      }
      console.log(this.serverEndpoints.SERVERURL)
      let header = {}
      this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.REGISTRAION, postBody, header).subscribe((response: any) => {

        if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
          //this.loggedInUser = response.resultSet.appUser;
          //this.loggedInUserSession = response.resultSet.session;
          // let user = response.resultSet;
          // localStorage.setItem(this.serverEndpoints.LOGGED_IN_USER_SEESION_ID, user.session_id);
          // localStorage.setItem(this.serverEndpoints.LOGGED_IN_USER_NAME, user.full_name);
          // localStorage.setItem(this.serverEndpoints.LOGGED_IN_USER_ID, user.id);
          this.appComponent.hideLoader();
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
}
