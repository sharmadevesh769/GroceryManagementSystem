import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product.model';
import { ProductsService } from '../Services/products.service';
import { AuthService } from '../Services/auth.service';
import { UserStoreService } from '../Services/user-store.service';
import { Router } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { PaginationService } from '../Services/pagination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageNumber:number=1
  pageSize:number=8
  totalPages:number=1
  totalCount:number=0
  displayPages=5;
  paginationArray:number[]=[]
  title: string = "Grocery Management System";
  products: Product[] = [];
  sellerProducts:Product[]=[];
  selectedCategory:string=''
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
    private pagination:PaginationService
  ) {
    this.loggedin = this.auth.isLoggedIn();
  }

  ngOnInit(): void {

    this.pageNumber = 1;
    this.pageSize = 8;
    this.totalPages = 1;
    this.totalCount = 0;
    this.displayPages = 5;
    this.paginationArray = [];

    this.loadAllProducts();



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
  }

  loadAllProducts() {
    this.productService.getAllProducts(this.pageNumber, this.pageSize, this.selectedCategory).subscribe({
      next: (res) => {
        this.products = res.products;
        this.totalPages = Math.ceil(res.totalCount / this.pageSize);
        this.paginationArray = this.pagination.getPaginationArray(
          this.totalPages,
          this.pageNumber,
          this.displayPages
        );


        if (this.pageNumber > this.totalPages) {
          this.pageNumber = this.totalPages;
        }

        this.loadSellerProducts();
      },
      error: (err) => {
       
        this.toast.error({
          detail: 'ERROR',
          summary: 'Failed to load products',
          duration: 2000,
        });
      },
    });
  }


  onPageChange(page:number){
    if(page>=1 && page<=this.totalPages){
      this.pageNumber=page
      this.loadAllProducts();
    }
  }

  loadSellerProducts(){
    this.sellerProducts=this.products.filter(product=>product.seller===this.email)
  }

  logout() {
    this.auth.signOut();
  }

  search() {
    this.productService.search.next(this.searchTerm);
  }
}
