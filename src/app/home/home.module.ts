import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { ProductComponent } from "./products/products.component";
import { ProductService } from "../shared/product.service";
import { ProductDetailComponent } from "./productdetail/productdetail.component";
import {ProductGuradService} from '../shared/product-gurad.service';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [
    HomeComponent,
    ProductComponent,
    ProductDetailComponent
  ],
  providers: [ProductService, ProductGuradService]
})
export class HomeModule {}
