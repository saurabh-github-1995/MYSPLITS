
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServerEndPointsService } from 'src/app/services/SERVERENDPOINTS/server-end-points.service';

import { AppComponent } from 'src/app/app.component';
import { DatasourceService } from 'src/app/services/DATASOURCE/datasource.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as CanvasJS from '../../../assets/canvasjs-2.3.2/canvasjs.min.js';




@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  shares: any;
  expenses: any;
  graphType;

  constructor(
    public router: Router,
    public datasourceService: DatasourceService,
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    public serverEndpoints: ServerEndPointsService,
    public appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.getUserShares();
    this.getUsersSpendingInTotal("column");


  }

  getUserShares() {
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.GETUSERSHARES, null, { headers: header }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        this.shares = response.resultSet;

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
  colors = ["#00897b", "#039be5", "#c0ca33", "#757575", "#546e7a", "#ffebee", "#d81b60",
    , "#512da8", "#3949ab", "#388e3c", "#cddc39", "#ffee58", "#ffe0b2",
    , "#a1887f", "#8d6e63", "#424242", "#ff9800", "#c5e1a5", "#26a69a "];
  getRandomColorShade(id) {

    const background = this.colors[Math.floor((Math.random() * 15) + 1)];
    $("#" + id).css("background-color", background)
  }

  // barChartOptions: ChartOptions = {
  //   responsive: true,

  // };
  // barChartLabels: Label[] = [];
  // barChartType: ChartType = 'bar';
  // barChartLegend = true;
  // barChartPlugins = [];

  // barChartData: ChartDataSets[] = [
  //   { data: [], label: 'Spendings in group' }
  // ];

  getUsersSpendingInTotal(type){
    this.appComponent.showLoader();
    //debugger
    let header = {
      "session_id": localStorage.getItem("LOGGED_IN_USER_SEESION_ID")
    }
    this.httpClient.post(this.serverEndpoints.SERVERURL + this.serverEndpoints.GETUSERSSPENDINGINTOTAL, null, { headers: header }).subscribe((response: any) => {
      this.appComponent.hideLoader();
      if (response.operationStatus == this.serverEndpoints.OPERATION_SUCESSESULL) {
        this.expenses = response.resultSet;
        this.generateDataForGraph(this.expenses,type);
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

  generateDataForGraph(expenses,type){
    let chartDataCustom=[];
    for(let i=0;i<expenses.length;i++){
      // this.barChartData[0].data.push(expenses[i].amount);
      // this.barChartLabels.push(expenses[i].group_name+" - "+expenses[i].paid_for);

      let dataObj ={y:null,label:""};
      dataObj.y=expenses[i].amount;
      dataObj.label=expenses[i].group_name+" - "+expenses[i].paid_for;
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
