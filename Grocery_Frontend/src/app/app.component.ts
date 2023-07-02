import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './Services/products.service';
import { AuthService } from './Services/auth.service';
import { UserStoreService } from './Services/user-store.service';
import { CartService } from './Services/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Grocery Management System';
  name: string = '';
  email: string = '';
  role: string = '';
  loggedin: boolean =false;

  constructor(
    private auth: AuthService,
    private userStore: UserStoreService,
  ) {
  }

  ngOnInit(): void {

    if(this.auth.isLoggedIn()){
      this.loggedin=true;
    }else{
      this.loggedin=false;
    }

    console.log(this.loggedin);
    this.userStore.getNameFromStore().subscribe((val) => {
      let nameFromToken = this.auth.getNameFromToken();

      this.name = val || nameFromToken;

    });
    this.userStore.getEmailFromStore().subscribe((val) => {
      let emailFromToken = this.auth.getEmailFromToken();

      this.email = val || emailFromToken;

    });
    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();

      this.role = val || roleFromToken;

    });
  }


  logout() {
    // this.role=""
    // this.email=""
    // this.name=""
    this.loggedin=false
    console.log(this.loggedin)
    this.auth.signOut();
  }


}
