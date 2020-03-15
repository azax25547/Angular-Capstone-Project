import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ProductDetailComponent } from "./productdetail/productdetail.component";
import {ProductGuradService} from '../shared/product-gurad.service';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  { path: "products/:product", component: ProductDetailComponent, canActivate:[ProductGuradService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
