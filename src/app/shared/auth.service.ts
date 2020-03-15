import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

let userDetails = [
  {
    id: 1,
    firstName: "Aditya",
    lastName: "Mishra",
    email: "aditya@example.com",
    phone: 9861890765,
    location: "chennai",
    password: "admin"
  }
];

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  isUserLoggedIn = false;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(userDetails);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(request: any) {
    // console.log(this.currentUserValue);
    const user = this.currentUserValue.find(
      x => x.email === request.email && x.password === request.password
    );
    if (!user) {
      return false;
    }
    localStorage.setItem("currentUser", JSON.stringify(this.currentUserValue));
    this.currentUserSubject.next(user);
    this.isUserLoggedIn = true
    return true;
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next({});
  }
}
