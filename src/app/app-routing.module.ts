import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotComponent } from "./forgot/forgot.component";
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "forgot",
    component: ForgotComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path: "",
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: "**",
    redirectTo: "/",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
