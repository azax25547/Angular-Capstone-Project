import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Products } from "../home/products/products.model";

const httpHeaders = {
  header: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class ProductService {
  url = "http://localhost:3000/products";
  constructor(private _httpClient: HttpClient) {}

  getProductDetails(): Observable<Products> {
    // @ts-ignore
    return this._httpClient.get<Products[]>(this.url, httpHeaders);
  }

  getProductDetail(id: number): Observable<Products> {
    const url = `${this.url}/${id}`;
    //@ts-ignore
    return this._httpClient.get<Products>(url, httpHeaders);
  }

  addNewProduct(product): Observable<Products> {
    //@ts-ignore
    return this._httpClient.post<Products>(this.url, product, httpHeaders);
  }

  deleteTheProduct(id): Observable<Products> {
    const url = `${this.url}/${id}`;
    //@ts-ignore
    return this._httpClient.delete<Products>(url, httpHeaders);
  }

  updateProduct(id, product): Observable<any> {
    const url = `${this.url}/${id}`;
    //@ts-ignore
    return this._httpClient.put(url, product, httpHeaders);
  }
}
