import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Products } from "../home/products/products.model";

const httpHeaders = {
  header: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class ProductService {
  url = "https://my-json-server.typicode.com/azax25547/database/products";
  constructor(private _httpClient: HttpClient) {}

  getProductDetails(): Observable<Products> {
    // @ts-ignore
    return this._httpClient.get<Products[]>(this.url, httpHeaders);
  }
}
