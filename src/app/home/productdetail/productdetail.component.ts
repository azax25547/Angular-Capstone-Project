import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../shared/product.service";

@Component({
  selector: "app-proddetail",
  templateUrl: "./productdetail.component.html",
  styleUrls: ['./productdetail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {}
  prod: string;
  products: any;
  product: string;

  ngOnInit() {
    this.prod = this._route.snapshot.paramMap.get('product')
    console.log(this.prod);
    // this.products = this._productService
    //   .getProductDetails()
    //   .subscribe(data => data, err => alert(err));
    // this.product = this.products.find(val => val.product === this.prod);
  }
}
