import { FirebaseService } from './../../services/FIREBASE/firebase.service';
import { DASHBOARDComponent } from './../dashboard.component';
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
  currencies: any;
  currency;
  type;
  description;
  name;
  local_error_message: string;
  constructor(
    public httpClient: HttpClient,
    public serverEndpoints: ServerEndPointsService,
    public datasourceService: DatasourceService,
    public appComponent: AppComponent,
    public router: Router,
    public dASHBOARDComponent:DASHBOARDComponent,
    public firebaseService:FirebaseService) { }

  ngOnInit() {
    this.dASHBOARDComponent.showSelectedTab("group");
    this.getMembersGroups();
    this.getListOfCurrencies();
    this.firebaseService.receiveMessage()
    let message = this.firebaseService.currentMessage;
    console.log(message)

  }
  groups;

  getMembersGroups() {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.GETMEMBERSGROUPS, null, { headers: header }).subscribe((response: any) => {

      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        this.groups = response.resultSet;
       // console.log(this.groups);
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
  navigateToGroupDetials(groupId) {
    this.router.navigate(['/dashboard/groupdetails'], { queryParams: { grp: groupId } });
  }
  getListOfCurrencies() {
    this.appComponent.showLoader();

    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.GETLISTOFCURRENCIES, null, { headers: null }).subscribe((response: any) => {

      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        this.currencies = response.resultSet
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

  createGroup() {
    this.local_error_message = "";
    if(this.name == null || this.name == undefined || this.name ==""){
      this.local_error_message = "Please enter the Name";
    }else if(this.type == null || this.type == undefined || this.type ==""){
      this.local_error_message = "Please select the type";
    }else if(this.currency == null || this.currency == undefined || this.currency ==""){
      this.local_error_message = "Please select  the currency";
    }else{
      this.appComponent.showLoader();
      let header = {
        "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
      }
      let data = {

        "name": this.name,
        "group_avtar": "URL",
        "discription": this.description,
        "type":this.type,
        "currency": this.currency
      }
      this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.CREATEGROUP, data, { headers: header }).subscribe((response: any) => {

        if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {

          this.appComponent.hideLoader();
          this.local_error_message="";
          $("#addExpenseForm").hide('slow');
          this.getMembersGroups();

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

  showCurrencyList() {
    $("#currencyList").show("slow");
  }
  setCurrencyValue(currencyObj) {
    this.currency = currencyObj.currency
    $("#currencyList").hide("slow");
  }
  showAddGroupForm(){
    $("#addExpenseForm").toggle('slow');
  }
}
