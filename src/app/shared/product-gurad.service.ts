import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class ProductGuradService implements CanActivate {
  state = false;
  constructor(private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem("loggedIn")) {
      return confirm("Are you sure to view the details!!");
    } else {
      alert("You are not Logged in to view. Log In to view Details");
      return false;
    }
  }
}
