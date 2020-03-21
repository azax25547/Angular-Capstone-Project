import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { ProductComponent } from "./products/products.component";
import { ProductService } from "../shared/product.service";
import { ProductDetailComponent } from "./productdetail/productdetail.component";
import { ProductGuradService } from "../shared/product-gurad.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";

@NgModule({
  imports: [CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [HomeComponent, ProductComponent, ProductDetailComponent],
  providers: [ProductService, ProductGuradService, Title]
})
export class HomeModule {}
