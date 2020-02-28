import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DASHBOARDComponent } from './dashboard/dashboard.component';
import { AppgroupsComponent } from './dashboard/appgroups/appgroups.component';
import { GroupdetailsComponent } from './dashboard/groupdetails/groupdetails.component';
import * as $ from 'jquery';
import { InvitesComponent } from './dashboard/invites/invites.component';
import { HomepageComponent } from './dashboard/homepage/homepage.component';
import { ChartsModule } from 'ng2-charts';




//declare var $: any;
console.log(`jQuery version: ${$.fn.jquery}`);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DASHBOARDComponent,
    AppgroupsComponent,
    GroupdetailsComponent,
    InvitesComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
