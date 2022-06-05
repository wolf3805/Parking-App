import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  opened: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeLeftSidebarStatus() {
    this.opened =! this.opened;
  }

}
