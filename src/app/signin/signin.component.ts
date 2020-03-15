import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent  {
  isValid = false;
  isLoggedIn = false;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    // private data: LogInService
    private auth: AuthService
  ) {}

  loginProfile = this.fb.group({
    loginEmail: ["", [Validators.required, Validators.email]],
    loginPassword: ["", Validators.required]
  });

  get f() {
    return this.loginProfile.controls;
  }

  onSubmit() {
    this.isValid = true;

    if (this.loginProfile.invalid) {
      return;
    }
    console.log(this.f.loginEmail.value, this.f.loginPassword.value);

    // // this.data.changeMessage(true);
    this.isLoggedIn = this.auth.login({
      email: this.f.loginEmail.value,
      password: this.f.loginPassword.value
    });
    if (this.isLoggedIn) this._router.navigate(["/"]);
    else alert("Incorrect Username or Password");
  }
}
