import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DASHBOARDComponent implements OnInit {

  constructor(
    public router:Router) { }

  ngOnInit() {
  }

  navigateToGroups(){
    this.router.navigate(['/dashboard/groups']);
  }

  navigateToInvites(){
    this.router.navigate(['/dashboard/invites']);
  }
}
