import { DatasourceService } from './services/DATASOURCE/datasource.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public datasourceService:DatasourceService) { }
  shoModal =false;
  title = 'mysplits';
  condition=false;
  header = "";
  message = ""
  show_Loader=false;
    SUCCESSFULL = 1;
    SOMETHING_WENT_WRONG = -1;
    USER_NAME_EXIST = -2;
    EMAIL_EXISTS = -3;
    USER_NAME_CANNOT_BE_NULL = -4;
    EMAIL_CANNOT_BE_NULL = -5;
    WRONG_CREDENTIALS = -6;
    USER_NOT_LOGGED_IN = -7;
    GROUP_NAME_CANNOT_BE_NULL = -8;
    GROUP_DOES_NOT_EXISTS = -9;
    USER_DOES_NOT_EXISTS = -10;
    INVITE_DOES_NOT_EXISTS = -11;
    AMOUNT_CANNOT_BE_NULL = -12;
    PAID_FOR_CANNOT_BE_NULL = -13;

  getSpecificError(operationStatus: any) {
    if(operationStatus==this.SOMETHING_WENT_WRONG){
      alert("");
    }else if(operationStatus==this.USER_NAME_EXIST){
      alert("");
    }else if(operationStatus==this.EMAIL_EXISTS){
      alert("");
    }else if(operationStatus==this.USER_NAME_CANNOT_BE_NULL){
      alert("");
    }else if(operationStatus==this.EMAIL_CANNOT_BE_NULL){
      alert("");
    }else if(operationStatus==this.WRONG_CREDENTIALS){
      //alert("User with this credentials does not exist");
      this.header = "ERROR";
      this.message = "User with this credentials does not exist";
      this.shoModal=true;

    }else if(operationStatus==this.USER_NOT_LOGGED_IN){
      alert("");
    }else if(operationStatus==this.GROUP_NAME_CANNOT_BE_NULL){
      alert("");
    }else if(operationStatus==this.GROUP_DOES_NOT_EXISTS){
      alert("");
    }else if(operationStatus==this.USER_DOES_NOT_EXISTS){
      alert("");
    }else if(operationStatus==this.INVITE_DOES_NOT_EXISTS){
      alert("");
    }else if(operationStatus==this.AMOUNT_CANNOT_BE_NULL){
      alert("");
    }else if(operationStatus==this.PAID_FOR_CANNOT_BE_NULL){
      alert("");
    }else{
      alert("");
    }
}

closeModal(){
  this.shoModal=false;
  this.header = "";
  this.message = "";

}
showLoader(){
  this.show_Loader=true;
}
hideLoader(){
  this.show_Loader=false;
}

}
