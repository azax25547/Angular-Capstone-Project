import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { Users } from "../user.module";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [
    `
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .form-signin {
        width: 100%;
        max-width: 550px;
        padding: 15px;
        margin: 0 auto;
      }
    `
  ]
})
export class RegisterComponent implements OnInit {
  isSubmitted = false;
  allUsers: Users[];

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.getUserDetails().subscribe(data => {
      this.allUsers = data;
    });
  }
  registerProfile = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, Validators.maxLength(10)]],
    location: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  get f() {
    return this.registerProfile.controls;
  }

  onRegister() {
    this.isSubmitted = true;
    if (this.registerProfile.invalid) {
      return;
    }

    const user = this.allUsers.find(
      x => x.email === this.registerProfile.value.email
    );
    if (!user) {
      this.auth.addNewUser(this.registerProfile.value).subscribe();
      this.auth.getUserDetails().subscribe();
    } else {
      alert("Already Registered. Please Login");
    }
    this._router.navigate(["/signin"]);
  }
}
