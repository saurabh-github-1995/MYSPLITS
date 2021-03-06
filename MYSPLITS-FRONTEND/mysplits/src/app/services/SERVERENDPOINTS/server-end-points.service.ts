import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerEndPointsService {


  constructor() { }
  SERVERURL= "http://127.0.0.1/";
  //SERVERURL="http://34.89.65.95/";


  OPERATION_SUCESSESULL=1;
  LOGGED_IN_USER_SEESION_ID="LOGGED_IN_USER_SEESION_ID";
  LOGGED_IN_USER_NAME="LOGGED_IN_USER_NAME";
  LOGGED_IN_USER_ID="LOGGED_IN_USER_ID";

  /**********************ENDPOINTS******************************** */
  LOGINUSER="loginUser";
  REGISTRAION="userRegistration";
  GETMEMBERSGROUPS = "getMembersGroups";
  GETGROUPEXPENSESLIST = "getGroupExpensesList";
  GETGROUPDETAILSBYGROUPID = "getGroupDetailsByGroupId";
  ADDEXPENSES="addExpenses";
  GETALLUSERSEXCEPTSELF="getAllUsersExceptSelf";
  SEARCHFORMEMBER = "searchForMember";
  INVITEMEMBERTOGROUP = "inviteMemberToGroup";
  GETINVITESOFUSER = "getInvitesOfUser";
  ACCEPTINVITE= "acceptInvite";
  GETLISTOFCURRENCIES = "getListOfCurrencies";
  CREATEGROUP = "createGroup";
  CHECKIFUSERLOGGEDIN = "checkIfUserLoggedIn";
  GETUSERSHARES = "getUserShares";
  GETUSERSSPENDINGINTOTAL = "getUsersSpendingInTotal";
  GETUSERSSHAREINGROUP = "getUsersShareInGroup";
  GETMEMBERSEXPENSESINGROUP = "getMembersExpensesInGroup";
  REQUESTFORSETTLEMENT = "requestForSettlement";
  GETUSERSOWINGINGROUP = "getUsersOwingInGroup";
  GETREQUESTFORSETTLEMETS = "getRequestForSettlemets";
  SETTLEBALANACEFORGROUP = "settleBalanaceForGroup";
  SENDFORGOTPASSWORDMAIL = "sendForgotpasswordMail";
  CHANGEPASSWORD = "changePassword";
}
