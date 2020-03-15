import { Component, Input, OnInit } from "@angular/core";
import { ProductService } from "../../shared/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product",
  templateUrl: "./products.component.html",
  styleUrls: ['./products.component.css']
})
export class ProductComponent implements OnInit {
  @Input() child: any;
  title = "ProductComponent";

  constructor(private productService: ProductService, private router: Router) {}
  products: any;

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails() {
    this.productService.getProductDetails().subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickProduct(product) {
    this.router.navigate(["/products", product.product]);
  }
}
