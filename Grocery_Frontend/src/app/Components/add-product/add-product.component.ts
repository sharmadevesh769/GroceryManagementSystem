import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  title: string = 'Grocery Management System';
  name: string = '';
  email: string = '';
  role: string = '';
  addProductForm!: FormGroup;
  NameLength:boolean=false;
  DescriptionLength:boolean=false;
  SpecificationLength:boolean=false;
  valid:boolean=true;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private auth: AuthService,
    private userStore: UserStoreService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      specification: ['', Validators.required],
      seller: ['', Validators.required],
    });

    this.userStore.getNameFromStore().subscribe((val) => {
      let nameFromToken = this.auth.getNameFromToken();

      this.name = val || nameFromToken;
    });
    this.userStore.getEmailFromStore().subscribe((val) => {
      let emailFromToken = this.auth.getEmailFromToken();

      this.email = val || emailFromToken;
    });

    this.addProductForm.patchValue({
      seller: this.email,
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();

      this.role = val || roleFromToken;
    });
  }

  logout() {
    this.auth.signOut();
  }

  addProduct() {

      if (this.addProductForm.valid) {
        this.valid=true;
          if (
          this.addProductForm.value.name.length > 100){
            this.NameLength=true;
            this.valid=false;
          }
          if (
          this.addProductForm.value.description.length > 255){
            this.DescriptionLength=true;
            this.valid=false;
          }
          if (
          this.addProductForm.value.specification.length > 100){
            this.SpecificationLength=true;
            this.valid=false;
          }

          if(!this.valid) return

        this.productService.addProduct(this.addProductForm.value).subscribe({
          next: (product) => {
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Product Added',
              duration: 2000,
            });
            if (product) this.router.navigate(['']);
          },
          error: (err) => {
            this.toast.error({
              detail: 'ERROR',
              summary: 'Something Went Wrong',
              duration: 2000,
            });
          },
        });
      } else {
        this.validateAllFormFields(this.addProductForm);
      }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
