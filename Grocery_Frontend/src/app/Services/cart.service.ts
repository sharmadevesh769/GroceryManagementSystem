import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../Models/product.model';
import { CartItem } from '../Models/cartitem.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  baseApiUrl: string =environment.baseApiUrl;

  constructor(private http:HttpClient, private router:Router) { }

  addToCart( addtocart:any){
    return this.http.post<any>(this.baseApiUrl + '/api/Cart',addtocart)
  }

  getCartItems( email:string){
    return this.http.get<CartItem[]>(this.baseApiUrl + '/api/Cart/'+ email)
  }

  removeCartItem( id:string){
    return this.http.delete<any>(this.baseApiUrl + '/api/Cart/'+ id)
  }
  alterQuantity( id:string,item:any){
    return this.http.put<any>(this.baseApiUrl + '/api/Cart/'+ id,item)
  }
  checkStock(id:string){
    return this.http.get<any>(this.baseApiUrl+'/api/Cart/CheckStock/'+id);
  }

}
