import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { ProductGuradService } from "../shared/product-gurad.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  currentUser: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private prodguard: ProductGuradService,
    private titleService: Title
  ) {
    if (localStorage.getItem("currentUser")) {
      this.currentUser = localStorage.getItem("currentUser");
      localStorage.setItem("loggedIn", "true");
    } else this.currentUser = "";
  }

  logout() {
    this.titleService.setTitle("Welcome To Product Management");
    this.auth.logout();
    this.currentUser = "";
    localStorage.removeItem("loggedIn");
  }
}
