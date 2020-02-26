import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServerEndPointsService } from 'src/app/services/SERVERENDPOINTS/server-end-points.service';
import { DatasourceService } from 'src/app/services/DATASOURCE/datasource.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-groupdetails',
  templateUrl: './groupdetails.component.html',
  styleUrls: ['./groupdetails.component.css']
})
export class GroupdetailsComponent implements OnInit {
  globalGroupId;
  expensesList: any;
  groups: any;
  paid_for;
  paid_date;
  amount;
  description;
  local_error_message: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,

    public httpClient: HttpClient,
    public serverEndpoints: ServerEndPointsService,
    public datasourceService: DatasourceService,
    public appComponent: AppComponent) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.globalGroupId = params.grp;
      if (this.globalGroupId == undefined || this.globalGroupId == null || this.globalGroupId == "") {
        this.router.navigate(['dashboard/groups']);
      }else{
        this.getGroupExpenses();
        this.getGroupDetailsByGroupId();
      }
    });
  }

  getGroupExpenses() {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    let data = {
      "group_id": this.globalGroupId
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.GETGROUPEXPENSESLIST, data, { headers: header }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        this.expensesList = response.resultSet;


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
  getGroupDetailsByGroupId() {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    let data = {
      "group_id": this.globalGroupId
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.GETGROUPDETAILSBYGROUPID, data, { headers: null }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        this.groups = response.resultSet;


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

  showAddExpenseForm(){
    $("#addExpenseForm").toggle('slow');
  }
  addExpense() {
    this.local_error_message = "";
    if(this.amount==undefined || this.amount==null || this.amount==0 ){
      this.local_error_message = "Please enter non zero amount"
    }else if(this.paid_for==undefined || this.paid_for==null || this.paid_for=="" ){
      this.local_error_message = "Please enter paid for details"
    }else if(this.paid_date==undefined || this.paid_date==null || this.paid_date=="" ){
      this.local_error_message = "Please enter the date"
    }else{
      this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }

    let data = {
      "group_id": this.globalGroupId,
      "description":this.description,
      "amount":this.amount,
      "paid_for":this.paid_for,
      "paid_date":this.paid_date
    }
    debugger
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.ADDEXPENSES, data, { headers: header }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        $("#addExpenseForm").hide('slow');
        this.getGroupExpenses();
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
