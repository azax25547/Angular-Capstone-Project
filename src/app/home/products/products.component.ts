import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "../../shared/product.service";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Chart } from "chart.js";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-product",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductComponent implements OnInit {
  chart = [];
  productFilter: string;
  willHide: boolean;
  outOfStock = true;
  isSorted = true;
  deletingObservables = [];
  isFiltered = {
    quantity: true,
    stock: true,
    currency: "INR"
  };
  views: number;
  @Input() child: any;
  products: any;
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
    this.views = product.views;
    this.router.navigate(["/products", product.product], {
      state: { ...product, views: this.views }
    });
  }

  alertUser() {
    if (confirm("Are you sure to Exit")) {
      this.willHide = true;
    } else {
      this.willHide = false;
    }
  }
  addNewProduct() {
    const prodValue = { ...this.productProfile.value, views: this.views };
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
    } else {
      return;
    }
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

  onChange(id: number, isChecked: boolean) {
    if (isChecked) {
      this.deletingObservables.push(this.productService.deleteTheProduct(id));
    }
  }

  sortByViews() {
    this.isSorted = false;
    return this.products.sort((a, b) => {
      return b.views - a.views;
    });
  }

  sortByQuantity() {
    this.isSorted = false;

    return this.products.sort((a, b) => {
      return b.quantity - a.quantity;
    });
  }

  sortByPriceMaxToMin() {
    this.isSorted = false;

    return this.products.sort((a, b) => {
      return b.price - a.price;
    });
  }

  sortByPriceMinToMax() {
    this.isSorted = false;

    return this.products.sort((a, b) => {
      return a.price - b.price;
    });
  }

  resetSort() {
    this.isSorted = true;
    this.productService.getProductDetails().subscribe(
      res => (this.products = res),
      err => console.log(err)
    );
  }

  filterQuantity() {
    this.isFiltered.quantity = !this.isFiltered.quantity;
  }
  filterStock() {
    this.isFiltered.stock = !this.isFiltered.stock;
  }
  filterCurrencyToUSD() {
    this.isFiltered.currency = "USD";
    this.products = this.products.map(x => {
      return { ...x, price: Math.ceil(x.price * 0.013) };
    });
  }
  filterCurrencyToINR() {
    this.isFiltered.currency = "INR";
    this.productService.getProductDetails().subscribe(
      res => (this.products = res),
      err => console.log(err)
    );
  }
  buildChart() {
    const maxViews = this.products
      .map(v => v.views)
      .sort((a, b) => b - a)
      .slice(0, 5);
    const maxViewedProducts = [];
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

  deleteMultipleProduct() {
    if (confirm("Are you sure to delete the products!!")) {
      if (this.deletingObservables.length == 0) {
        alert("At select a Product to delete.");
      }
      forkJoin(this.deletingObservables).subscribe(
        () => {
          this.getProductDetails();
        },
        err => {
          console.log(err);
        },
        () => {
          console.log("Deleted Successfully");
        }
      );
    } else return;
  }
}
