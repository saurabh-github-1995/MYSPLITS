import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServerEndPointsService } from 'src/app/services/SERVERENDPOINTS/server-end-points.service';
import { DatasourceService } from 'src/app/services/DATASOURCE/datasource.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {
  invites: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    public httpClient: HttpClient,
    public serverEndpoints: ServerEndPointsService,
    public datasourceService: DatasourceService,
    public appComponent: AppComponent) { }

  ngOnInit() {
    this.getAllInvitesOfUsers();
  }
  getAllInvitesOfUsers() {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.GETINVITESOFUSER, null, { headers: header }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        $("#searchUser").hide('slow');
        this.invites= response.resultSet;

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

  acceptInvite(invite_id) {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    let data = {
      "invite_id": invite_id
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.ACCEPTINVITE, data, { headers: header }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        $("#searchUser").hide('slow');
        this.getAllInvitesOfUsers();

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
