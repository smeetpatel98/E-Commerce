import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { FooterComponent } from './header/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-add-product/seller-update-product/seller-update-product.component';
import { LoginpageComponent } from './seller-auth/loginpage/loginpage.component';
import { SellerAuthComponent } from './seller-auth/signup_page';
import { UserloginComponent } from './seller-auth/userlogin/userlogin.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { CartComponent } from './shopping-list/cart/cart.component';
import { ProductdetailspageComponent } from './shopping-list/productdetailspage/productdetailspage.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { EditlistComponent } from './userlist/editlist/editlist.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
  {
    path: 'app-loginpage',
    component: LoginpageComponent,
  },
  {
    path: 'app-signup_page',
    component: SellerAuthComponent,
  },
  {
    path: 'app-userlogin',
    component: UserloginComponent,
  },
  {
    path: 'app-errorpage',
    component: ErrorpageComponent,
  },
  {
    path: 'app-footer',
    component: FooterComponent,
  },
  {
    path: 'app-seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-shopping-list',
    // component: ShoppingListComponent,
    loadChildren: () => import('./shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details/:id',
    component: ProductdetailspageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-userlist',
    component: UserlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-editlist/:id',
    component: EditlistComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
