import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html"
})
export class ForgotComponent {
  constructor(private _router: Router, private fb: FormBuilder) {}
  forgetProfile = this.fb.group({
    loginEmail: ["", Validators.required],
    loginPassword: ["", Validators.required]
  });

  onForgotId() {
    console.log(this.forgetProfile.controls);
  }
}
