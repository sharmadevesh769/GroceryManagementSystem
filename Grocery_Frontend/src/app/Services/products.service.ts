import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../Models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public search = new BehaviorSubject<string>('');
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(
    pageNumber: number,
    pageSize: number,
    category: string = ''
  ): Observable<{
    totalCount: number;
    totalPages: number;
    products: Product[];
  }> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('category', category);

    return this.http.get<{
      totalCount: number;
      totalPages: number;
      products: Product[];
    }>(`${this.baseApiUrl}/api/Product`, { params });
  }


  addProduct(addProductRequest: Product): Observable<Product> {
    addProductRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Product>(
      `${this.baseApiUrl}/api/Product`,
      addProductRequest
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseApiUrl}/api/Product/${id}`);
  }

  updateProduct(id: string, updateProduct: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseApiUrl}/api/Product/${id}`,
      updateProduct
    );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.baseApiUrl}/api/Product/${id}`);
  }
}
