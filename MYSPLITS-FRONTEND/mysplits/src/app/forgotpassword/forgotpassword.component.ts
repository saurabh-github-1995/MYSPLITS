import { AppComponent } from './../app.component';
import { DatasourceService } from './../services/DATASOURCE/datasource.service';
import { ServerEndPointsService } from './../services/SERVERENDPOINTS/server-end-points.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email: any;

  constructor(public httpClient: HttpClient,
    public serverEndpoints: ServerEndPointsService,
    public datasourceService: DatasourceService,
    public appComponent:AppComponent,
    public router:Router) { }

  ngOnInit() {
  }

  sendOtp() {
    this.appComponent.showLoader();

    let postBody = {
      "email": this.email,
    }
    console.log(this.serverEndpoints.SERVERURL)
    let header = {}
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.SENDFORGOTPASSWORDMAIL, postBody, header).subscribe((response: any) => {

      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        //this.loggedInUser = response.resultSet.appUser;
        //this.loggedInUserSession = response.resultSet.session;

        this.appComponent.hideLoader();
        this.router.navigate(['/changepassword']);
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
