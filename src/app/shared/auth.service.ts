import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "../user.module";

const httpHeaders = {
  header: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class AuthService {
  url = "http://localhost:3000/users";
  userDetails: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  isUserLoggedIn = false;

  constructor(private _httpClient: HttpClient) {
    this.getUserDetails().subscribe(data => {
      this.userDetails = data;
    });
    this.currentUserSubject = new BehaviorSubject<any>(this.userDetails);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getUserDetails(): Observable<Users[]> {
    // @ts-ignore
    return this._httpClient.get<Users[]>(
      "http://localhost:3000/users",
      // @ts-ignore
      httpHeaders
    );
  }

  addNewUser(users): Observable<Users> {
    const user = this.userDetails.find(x => x.email === users.email);
    return this._httpClient.post<Users>(
      "http://localhost:3000/users",
      users,
      // @ts-ignore
      httpHeaders
    );
  }

  login(request: any) {
    console.log(this.userDetails);
    const user = this.userDetails.find(
      x => x.email === request.email && x.password === request.password
    );
    if (!user) {
      return false;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isUserLoggedIn = true;
    return true;
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next({});
  }
}
