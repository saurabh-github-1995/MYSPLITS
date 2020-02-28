import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServerEndPointsService } from 'src/app/services/SERVERENDPOINTS/server-end-points.service';
import { DatasourceService } from 'src/app/services/DATASOURCE/datasource.service';
import { AppComponent } from 'src/app/app.component';

import * as CanvasJS from '../../../assets/canvasjs-2.3.2/canvasjs.min.js';


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
  allUsers: null;
  search_text: any;
  graphType;
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
      } else {
        this.getGroupExpenses();
        this.getGroupDetailsByGroupId();
        this.getUsersShareInGroup("column");
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

  showAddExpenseForm() {
    $("#addExpenseForm").toggle('slow');
  }
  addExpense() {
    this.local_error_message = "";
    if (this.amount == undefined || this.amount == null || this.amount == 0) {
      this.local_error_message = "Please enter non zero amount"
    } else if (this.paid_for == undefined || this.paid_for == null || this.paid_for == "") {
      this.local_error_message = "Please enter paid for details"
    } else if (this.paid_date == undefined || this.paid_date == null || this.paid_date == "") {
      this.local_error_message = "Please enter the date"
    } else {
      this.appComponent.showLoader();
      //debugger
      let header = {
        "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
      }

      let data = {
        "group_id": this.globalGroupId,
        "description": this.description,
        "amount": this.amount,
        "paid_for": this.paid_for,
        "paid_date": this.paid_date
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

  searchUser() {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    let data = {
      "search_text": this.search_text + "*",
      "created_by": this.groups.created_by
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.SEARCHFORMEMBER, data, { headers: header }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        this.allUsers = response.resultSet;


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
  inviteMemberToGroup(userId) {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    let data = {
      "user_id": userId,
      "group_id": this.globalGroupId
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.INVITEMEMBERTOGROUP, data, { headers: header }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        $("#searchUser").hide('slow');


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

  getUsersShareInGroup(type) {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    let data = {

      "group_id": this.globalGroupId
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.GETUSERSSHAREINGROUP,
       data, { headers: header }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        this.generateDataForGraph(response.resultSet,type);

      } else {
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
  showSendInviteForm() {
    $("#searchUser").toggle('slow');
  }
  generateDataForGraph(expenses,type){
    let chartDataCustom=[];
    for(let i=0;i<expenses.length;i++){
      // this.barChartData[0].data.push(expenses[i].amount);
      // this.barChartLabels.push(expenses[i].group_name+" - "+expenses[i].paid_for);

      let dataObj ={y:null,label:""};
      dataObj.y=expenses[i].amount;
      dataObj.label=expenses[i].paid_by_name;
      chartDataCustom.push(dataObj);
    }


    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Expenses in all groups"
      },
      data: [{
        type: type,
        showInLegend: true,
        //legendText: "Expenses shown before dividing",
        dataPoints: chartDataCustom,
         indexLabel: "{y}",
         indexLabelPlacement: "outside",
         indexLabelOrientation: "horizontal",
      }]
    });

    chart.render();

  }
}


