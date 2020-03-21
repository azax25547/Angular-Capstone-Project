import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "../../shared/product.service";
import { FormBuilder, Validators, MaxLengthValidator } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Chart } from "chart.js";
@Component({
  selector: "app-product",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductComponent implements OnInit {
  chart = [];
  willHide: boolean;
  outOfStock = true;
  @Input() child: any;
  products: any;
  // isSubmitted = false;
  childData = JSON.parse(localStorage.getItem("currentUser") || null);
  @ViewChild("closebutton") closebutton;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title
  ) {}

  productProfile = this.fb.group({
    product: ["", [Validators.required]],
    description: ["", [Validators.required]],
    manufacturer: ["", [Validators.required]],
    price: ["", [Validators.required]],
    quantity: ["", [Validators.required]],
    inStock: ["", [Validators.required]]
  });
  ngOnInit() {
    this.getProductDetails();
    if (this.childData) {
      this.titleService.setTitle(`Welcome ${this.childData.firstName}`);
    } else {
      this.titleService.setTitle(`Welcome to Product Management`);
    }
  }

  get f() {
    return this.productProfile.controls;
  }
  getProductDetails() {
    this.productService.getProductDetails().subscribe(
      data => {
        this.products = data;
        this.buildChart();
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickProduct(product) {
    this.router.navigate(["/products", product.product], { state: product });
  }

  alertUser() {
    if (confirm("Are you sure to Exit")) {
      this.willHide = true;
    } else {
      this.willHide = false;
    }
  }
  addNewProduct() {
    let prodValue = { ...this.productProfile.value, views: 0 };
    console.log(prodValue);
    this.productService.addNewProduct(prodValue).subscribe();
    alert("New Product Updated");
    this.getProductDetails();
    this.closebutton.nativeElement.click();
  }
  deleteProduct(id) {
    if (confirm("Are you sure to delete the product?")) {
      this.productService.deleteTheProduct(id).subscribe();
      alert("Product Removed");
      this.getProductDetails();
    } else return;
  }
  clearForm() {
    this.productProfile.patchValue({
      product: "",
      description: "",
      price: "",
      quantity: "",
      manufacturer: ""
    });
  }

  buildChart() {
    let maxViews = this.products
      .map(v => v.views)
      .sort((a, b) => b - a)
      .slice(0, 5);
    let maxViewedProducts = [];
    maxViews.map(val => {
      maxViewedProducts.push(this.products.find(x => x.views === val).product);
    });
    this.chart = new Chart("canvas", {
      type: "line",
      data: {
        labels: maxViewedProducts,
        datasets: [
          {
            label: "# of views",
            data: maxViews,
            borderColor: "#3cba9f"
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              ticks: { beginAtZero: true },
              display: true
            }
          ]
        }
      }
    });
  }
}
