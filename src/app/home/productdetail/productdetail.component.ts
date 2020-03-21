import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/product.service";
import { Title } from "@angular/platform-browser";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-proddetail",
  templateUrl: "./productdetail.component.html",
  styleUrls: ["./productdetail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  prod: string;
  products: any;

  newProductProfile = this.fb.group({
    product: ["", [Validators.required]],
    description: ["", [Validators.required]],
    manufacturer: ["", [Validators.required]],
    price: ["", [Validators.required]],
    quantity: ["", [Validators.required]],
    inStock: ["", [Validators.required]]
  });
  willHide: boolean;
  @ViewChild("closebutton") closebutton;
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router,
    private fb: FormBuilder,
    private titleService: Title
  ) {
    this.products = this._router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.prod = this._route.snapshot.paramMap.get("product");
    this.setTitle(this.prod);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  updateProduct() {
    this.newProductProfile.patchValue({
      product: this.products.product,
      description: this.products.description,
      price: this.products.price,
      quantity: this.products.quantity,
      manufacturer: this.products.manufacturer
    });
  }

  updateProductToDB() {
    let prodValue = { ...this.newProductProfile.value, views: 0 };
    console.log(prodValue);
    this._productService.updateProduct(this.products.id, prodValue).subscribe();
    alert("Product Updated");
    this._productService.getProductDetail(this.products.id).subscribe(
      data => (this.products = data),
      err => console.log(err)
    );
    this.closebutton.nativeElement.click();
  }
  clearForm() {
    this.newProductProfile.patchValue({
      product: "",
      description: "",
      price: "",
      quantity: "",
      manufacturer: ""
    });
  }

  alertUser() {
    if (confirm("Are you sure to Exit")) {
      this.willHide = true;
    } else {
      this.willHide = false;
    }
  }
}
