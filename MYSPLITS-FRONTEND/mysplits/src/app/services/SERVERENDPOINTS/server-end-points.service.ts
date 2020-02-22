import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerEndPointsService {


  constructor() { }
  SERVERURL= "http://127.0.0.1:5000/";


  OPERATION_SUCESSESULL=1;
  LOGGED_IN_USER_SEESION_ID="LOGGED_IN_USER_SEESION_ID";
  LOGGED_IN_USER_NAME="LOGGED_IN_USER_NAME";
  LOGGED_IN_USER_ID="LOGGED_IN_USER_ID";

  /**********************ENDPOINTS******************************** */
  LOGINUSER="loginUser";
  REGISTRAION="userRegistration";
}
