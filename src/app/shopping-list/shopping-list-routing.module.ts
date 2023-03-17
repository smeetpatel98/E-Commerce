import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductdetailspageComponent } from './productdetailspage/productdetailspage.component';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'details/:id',
    component: ProductdetailspageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
