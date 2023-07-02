import { Injectable } from "@angular/core";
import { AuthService } from "../Services/auth.service";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { NgToastService } from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private toast:NgToastService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toast.error({detail:"ERROR", summary:"Please Login First!"});
      this.router.navigate(['login']);
      return false;
    }
  }
}


