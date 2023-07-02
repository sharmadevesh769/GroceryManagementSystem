import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MyOrder } from 'src/app/Models/MyOrder.model';
import { Product } from 'src/app/Models/product.model';
import { AuthService } from 'src/app/Services/auth.service';
import { MyorderService } from 'src/app/Services/myorder.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent {
  title: string = "Grocery Management System";
  Orders: MyOrder[] = [];


  name: string = "";
  role: string = "";
  searchTerm: string = "";
  email:string=""
  p:number=1

  loggedin: boolean = false;

  constructor(
    private productService: ProductsService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    private toast:NgToastService,
    private MyOrder:MyorderService,
    private app:AppComponent
  ) {
    this.loggedin = this.auth.isLoggedIn();
  }

  ngOnInit(): void {


    this.userStore.getNameFromStore().subscribe((val) => {
      let nameFromToken = this.auth.getNameFromToken();
      this.name = val || nameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.userStore.getEmailFromStore().subscribe((val) => {
      let emailFromToken = this.auth.getEmailFromToken();

      this.email = val || emailFromToken;

    });

    this.getOrders();


  }

  logout() {
    this.auth.signOut();
  }
  getOrders(){
    this.MyOrder.getOrders(this.email).subscribe(
      response=>{
        this.Orders=response
      },
    );
  }
}
