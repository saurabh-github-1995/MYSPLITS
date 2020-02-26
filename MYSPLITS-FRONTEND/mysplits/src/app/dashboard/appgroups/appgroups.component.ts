import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerEndPointsService } from 'src/app/services/SERVERENDPOINTS/server-end-points.service';
import { DatasourceService } from 'src/app/services/DATASOURCE/datasource.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appgroups',
  templateUrl: './appgroups.component.html',
  styleUrls: ['./appgroups.component.css']
})
export class AppgroupsComponent implements OnInit {
  session_id;
  constructor(
    public httpClient: HttpClient,
    public serverEndpoints: ServerEndPointsService,
    public datasourceService: DatasourceService,
    public appComponent:AppComponent,
    public router:Router) { }

  ngOnInit() {
    this.getMembersGroups();
  }
  groups;

  getMembersGroups() {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id":localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.GETMEMBERSGROUPS, null, { headers: header }).subscribe((response: any) => {

      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        this.groups = response.resultSet;
        console.log(this.groups);
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
