import { AppComponent } from './../app.component';
import { DatasourceService } from './../services/DATASOURCE/datasource.service';
import { ServerEndPointsService } from './../services/SERVERENDPOINTS/server-end-points.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  email: any;
  password: any;
  otp: any;
  repassword: any;
  constructor(
    public httpClient: HttpClient,
    public serverEndpoints: ServerEndPointsService,
    public datasourceService: DatasourceService,
    public appComponent:AppComponent,
    public router:Router) { }

  ngOnInit() {
  }

  changePassword() {
    if(this.password===this.repassword){
      this.appComponent.showLoader();

      let postBody = {
        "email": this.email,
        "new_password": this.password,
        "otp":this.otp
      }
      console.log(this.serverEndpoints.SERVERURL)
      let header = {}
      this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.CHANGEPASSWORD, postBody, header).subscribe((response: any) => {

        if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {

          this.appComponent.hideLoader();
          this.router.navigate(['/login']);
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
    }else{
      this.appComponent.getSpecificError(-17);
    }


  }

}
