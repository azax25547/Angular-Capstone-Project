import {Component} from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import {ProductGuradService} from '../shared/product-gurad.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser: any;
  constructor(private auth: AuthService, private router: Router, private prodguard: ProductGuradService) {
    if (localStorage.getItem("currentUser")) {
      this.currentUser = localStorage.getItem("currentUser");
    } else this.currentUser = "";
  }


  logout() {
    this.auth.logout();
    this.currentUser = "";
    console.log(this.currentUser);
  }
}
