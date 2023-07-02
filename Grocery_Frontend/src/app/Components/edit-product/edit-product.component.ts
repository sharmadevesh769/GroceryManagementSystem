import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  title: string = 'Grocery Management System';
  name: string = '';
  email: string = '';
  role: string = '';

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
    private app:AppComponent
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.productService.getProduct(id).subscribe({
            next: (response) => {
              this.productDetails = response;
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
  updateProduct() {
    this.productService
      .updateProduct(this.productDetails.id, this.productDetails)
      .subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['']);
          }
        },
      });
  }

  logout() {
    this.auth.signOut();
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.router.navigate(['']);
      },
    });
  }
}
