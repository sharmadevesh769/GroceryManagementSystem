import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MyOrder } from '../Models/MyOrder.model';

@Injectable({
  providedIn: 'root'
})
export class MyorderService {
  baseApiUrl: string =environment.baseApiUrl;
  constructor( private http :HttpClient, private router:Router) {}

  placeOrder(Order:any){
    return this.http.post<any>(this.baseApiUrl+'/api/MyOrder',Order)
  }
  getOrders( email:string){
    return this.http.get<MyOrder[]>(this.baseApiUrl + '/api/MyOrder/'+ email)
  }

}
