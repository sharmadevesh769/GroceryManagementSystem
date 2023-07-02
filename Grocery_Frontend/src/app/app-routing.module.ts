import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './User/registration/registration.component';
import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './User/login/login.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { AuthGuard } from './Guards/auth.guard';
import { ViewProductComponent } from './Components/view-product/view-product.component';
import { MyorderComponent } from './Components/myorder/myorder.component';
import { ShoppingcartComponent } from './Components/shoppingcart/shoppingcart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'addProduct',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
  },
  {
    path: 'viewProduct/:id',
    component: ViewProductComponent,
  },
  {
    path: 'myorder',
    component: MyorderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shoppingcart',
    component: ShoppingcartComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path:'myOrders',
  //   component:MyorderComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
