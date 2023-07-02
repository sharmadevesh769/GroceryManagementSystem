import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartItem } from 'src/app/Models/cartitem.model';
import { Product } from 'src/app/Models/product.model';
import { Review } from 'src/app/Models/review.model';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';
import { ReviewService } from 'src/app/Services/review.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  title: string = 'Grocery Management System';
  name: string = '';
  email: string = '';
  role: string = '';
  loggedin: boolean = false;
  ReviewDescription: string = '';

  Reviews: Review[] = [];

  productDetails: Product = {
    id: '',
    name: '',
    description: '',
    category: '',
    quantity: 0,
    image: '',
    price: 0,
    discount: 0,
    specification: '',
    seller: '',
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private auth: AuthService,
    private userStore: UserStoreService,
    private cart: CartService,
    private toast: NgToastService,
    private review: ReviewService,
    private app:AppComponent
  ) {
    this.loggedin = this.auth.isLoggedIn();
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.productService.getProduct(id).subscribe({
            next: (response) => {

              this.productDetails = response;
              this.getReview(response.id);
            },
          });
        }
      },
    });



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
    this.auth.signOut();
  }

  onSubmit() {
    const cartItem = {
      id: '00000000-0000-0000-0000-000000000000',
      productId: this.productDetails.id,
      userId: this.email,
      quantity: 1,
    };

    this.cart.addToCart(cartItem).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/shoppingcart']);
      },
      (err) => {

        this.toast.error({
          detail: 'ERROR',
          summary: 'Please Check Product Quantity',
          duration: 2000,
        });
      }
    );
  }

  AddReview() {
    if (!this.ReviewDescription) {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Review is Empty',
        duration: 2000,
      });

      return;
    }

    const review = {
      productid: this.productDetails.id,
      userid: this.email,
      Description: this.ReviewDescription,
    };

    this.review.addReview(review).subscribe(
      (res) => {
        this.ReviewDescription = '';
      });
  }

  getReview(id:string) {

    this.review.getReviews(this.productDetails.id).subscribe((res) => {
      this.Reviews = res;
    });
  }
}
