import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/signup_page';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { RemovePipe, ShoppingListComponent } from './shopping-list/shopping-list.component';
import { LoginpageComponent } from './seller-auth/loginpage/loginpage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { DataTablesModule } from 'angular-datatables';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-add-product/seller-update-product/seller-update-product.component';
import { ProductdetailspageComponent } from './shopping-list/productdetailspage/productdetailspage.component';
import { UserloginComponent } from './seller-auth/userlogin/userlogin.component';
import { CartComponent } from './shopping-list/cart/cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './header/footer/footer.component';
import { UserlistComponent } from './userlist/userlist.component';
import { EditlistComponent } from './userlist/editlist/editlist.component';

import { EncrdecrserviceService } from '../app/services/encrdecrservice.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    ShoppingListComponent,
    LoginpageComponent,
    ErrorpageComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    ProductdetailspageComponent,
    UserloginComponent,
    CartComponent,
    RemovePipe,
    FooterComponent,
    UserlistComponent,
    EditlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgHttpLoaderModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [HeaderComponent, EncrdecrserviceService ],
  bootstrap: [AppComponent],
})
export class AppModule { }
