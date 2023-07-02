import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { CartService } from 'src/app/Services/cart.service';
import { CartItem } from 'src/app/Models/cartitem.model';
import { Product } from 'src/app/Models/product.model';
import { NgToastService } from 'ng-angular-popup';
import { MyOrder } from 'src/app/Models/MyOrder.model';
import { MyorderService } from 'src/app/Services/myorder.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  title: string = "Grocery Management System";
  cartItems: CartItem[] = [];

  name: string = "";
  role: string = "";
  email: string = "";
  loggedin: boolean = false;

  constructor(
    private auth: AuthService,
    private userStore: UserStoreService,
    private cart: CartService,
    private toast:NgToastService,
    private MyOrder:MyorderService,
    private router:Router,
    private app:AppComponent
  )
  {
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

    this.getCartItems();
    this.checkStock()
  }

  logout() {
    this.auth.signOut();
  }

  getCartItems(){

    this.cart.getCartItems(this.email).subscribe(
      response => {
        this.cartItems = response.map(item => ({
          id:item.id,
          product: item.product as Product,
          addedQuantity: item.addedQuantity
        }));

      },
      error => {

      }
    );
  }

  calculateAmount(){
    let total=0;
    for(let item of this.cartItems){
      total+=item.addedQuantity*( item.product.price - item.product.discount );
    }
    return total;
  }

  increaseQuantity(id: string, item:CartItem){
    if(item.addedQuantity!=0){
      item.addedQuantity++;
    this.cart.alterQuantity(id,item).subscribe(
      (res=>{

      }),
      (err=>{
        item.addedQuantity--;
        this.toast.error({
          detail: 'ERROR',
          summary: 'Quanityt Limit Reached',
          duration: 2000,
        });
      })
    )
    }
  }
  decreaseQuantity(id:string, item:CartItem){

    if(item.addedQuantity>=1){
      item.addedQuantity--;
      this.cart.alterQuantity(id,item).subscribe(
      (res=>{

      }),
      (err=>{

        item.addedQuantity++;
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something went wrong',
          duration: 2000,
        });
      })
    )
    }
  }
  removeItem(id:string){
    this.cart.removeCartItem(id).subscribe(
      (res=>{
        this.getCartItems();
      }),
      (err=>{

      })
    )
  }

  checkStock(){
   for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      this.cart.checkStock(element.id).subscribe(
        (res=>{

        }),
        (err=>{

        })
      )
   }
  }

  placeOrder(){
    const orders :MyOrder[]=[]
    this.cartItems.forEach(element => {
      const Order:MyOrder={
      cartId:element.id,
      orderId:'00000000-0000-0000-0000-000000000000',
      product: element.product,
      productId:element.product.id,
      userId:this.email,
      productQuantity:element.addedQuantity,
      productAmount:element.product.price,
      orderDate: new Date(),
      totalAmount:element.addedQuantity*(element.product.price-element.product.discount)
      };
      orders.push(Order)
    });


      this.MyOrder.placeOrder(orders).subscribe({
        next:(res)=>{
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Order Placed',
            duration: 2000,
          });
          this.router.navigate(['/myorder'])
        },
        error:(err)=>{
          this.toast.error({
            detail: 'ERROR',
            summary: 'Please Check Product Availability',
            duration: 2000,
          });
        }
      })

  }
}

