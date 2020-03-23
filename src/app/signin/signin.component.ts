import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  isValid = false;
  isLoggedIn = false;
  allUsers: any;
  users: any;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    // private data: LogInService
    private auth: AuthService
  ) {
    this.auth.getUserDetails().subscribe(data => (this.allUsers = data));
  }

  ngOnInit() {
    // this.auth.getUserDetails().subscribe(data => (this.allUsers = data));
  }

  loginProfile = this.fb.group({
    loginEmail: ["", [Validators.required, Validators.email]],
    loginPassword: ["", Validators.required]
  });

  get f() {
    return this.loginProfile.controls;
  }

  onSubmit() {
    this.isValid = true;
    const user = this.allUsers.find(x => {
      return x.email == this.f.loginEmail.value;
    });
    if (!user) {
      alert("You are not Registered with us. Kindly Register");
      return;
    }
    if (this.loginProfile.invalid) {
      return;
    }

    console.log(this.allUsers);
    const ifUser = this.allUsers.find(
      x =>
        x.email === this.f.loginEmail.value &&
        x.password === this.f.loginPassword.value
    );
    if (!ifUser) {
      return false;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.isLoggedIn = true;
    if (this.isLoggedIn) this._router.navigate(["/"]);
    else alert("Incorrect Username or Password");
  }
}
