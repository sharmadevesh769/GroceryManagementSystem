import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AppComponent } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string =environment.baseApiUrl;
  private userPayload:any

  constructor( private http:HttpClient, private router:Router) {
    this.userPayload=this.decodedToken();
   }

  signUp( userObj:User){
    userObj.Id='00000000-0000-0000-0000-000000000000'
    return this.http.post<User>(this.baseApiUrl +'/api/User/register',userObj)
  }

  login( loginObj:any){

   return this.http.post<any>(this.baseApiUrl + '/api/User/authenticate',loginObj)
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }


  getToken(){
    return localStorage.getItem('token');
  }


  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  signOut(){
    localStorage.clear();
    // this.app.email="";
    // this.app.role="";
    // this.app.name="";
    this.router.navigate(['login'])
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token=this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getNameFromToken(){
    if(this.userPayload) return this.userPayload.unique_name;
  }
  getRoleFromToken(){
    if(this.userPayload) return this.userPayload.role;
  }
  getEmailFromToken(){
    if(this.userPayload) return this.userPayload.email;
  }

}
