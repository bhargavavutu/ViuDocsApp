import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DataserviceService} from '../../../dataservice.service';
import {Router, NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-headercomponent',
  templateUrl: './headercomponent.component.html',
  styleUrls: ['./headercomponent.component.css']
})
export class HeadercomponentComponent implements OnInit {

@Output() ToggleMe: EventEmitter<any> = new EventEmitter();

validuser = false;
closed: boolean;
mySubscription: any;
  constructor(public datasvc: DataserviceService, public router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
   });
  }

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.datasvc.getLoginData().subscribe((val) => {
      this.validuser = val;
    });
  }
  toggleSideBar() {
    this.ToggleMe.emit();
  }
  loginclick() {
    this.closed = !this.closed;
    console.log(this.closed);
  }
}
