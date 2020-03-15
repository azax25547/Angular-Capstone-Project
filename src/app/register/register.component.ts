import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

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
    `
  ]
})
export class RegisterComponent {
  isSubmitted = false;

  constructor(private _router: Router, private fb: FormBuilder) {}

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

    this._router.navigate(["/signin"]);
  }
}
