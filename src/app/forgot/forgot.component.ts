import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.css"]
})
export class ForgotComponent implements OnInit {
  userEmail: string;
  allUsers: any;
  newPW: string;
  confirmPW: string;

  isUser: any;
  constructor(private _router: Router, private user: AuthService) {}

  ngOnInit() {
    this.user.getUserDetails().subscribe(
      data => (this.allUsers = data),
      err => console.log(err)
    );
  }

  onForgotId() {
    this.isUser = this.allUsers.find(x => {
      return x.email == this.userEmail;
    });
    if (!this.isUser) {
      alert("Email not registered. Please register with us");
      return;
    }
    console.log(this.isUser);
  }

  changePassword() {
    if (this.newPW.length <= 6) {
      alert("Password Length Should be greater than 6 letters");
    } else if (this.confirmPW != this.newPW) {
      alert("Passwords are not matching");
    } else {
      this.user
        .updateUserPassword(this.isUser.id, {
          ...this.isUser,
          password: this.newPW
        })
        .subscribe();
      alert("Passwords has been successfully changed");
      this.newPW = "";
      this.confirmPW = "";
      this.user.getUserDetails().subscribe(data => console.log(data));
    }
  }
}
