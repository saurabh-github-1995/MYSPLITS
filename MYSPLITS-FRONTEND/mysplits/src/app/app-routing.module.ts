import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomepageComponent } from './dashboard/homepage/homepage.component';
import { InvitesComponent } from './dashboard/invites/invites.component';
import { GroupdetailsComponent } from './dashboard/groupdetails/groupdetails.component';
import { AppgroupsComponent } from './dashboard/appgroups/appgroups.component';

import { DASHBOARDComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  {
    path: 'dashboard', component: DASHBOARDComponent, children: [
      {
        path: 'groups',
        component: AppgroupsComponent
      },{
        path: 'groupdetails',
        component: GroupdetailsComponent
      },{
        path: 'invites',
        component: InvitesComponent
      },{
        path: 'home',
        component: HomepageComponent
      }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
