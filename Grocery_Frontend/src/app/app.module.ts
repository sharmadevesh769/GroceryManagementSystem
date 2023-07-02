import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './User/registration/registration.component';
import { LoginComponent } from './User/login/login.component';
import { HomeComponent } from './Home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ViewProductComponent } from './Components/view-product/view-product.component';
import { FilterPipe } from './shared/filter.pipe';
import { MyorderComponent } from './Components/myorder/myorder.component';
import { ShoppingcartComponent } from './Components/shoppingcart/shoppingcart.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AddProductComponent,
    EditProductComponent,
    ViewProductComponent,
    FilterPipe,
    MyorderComponent,
    ShoppingcartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
