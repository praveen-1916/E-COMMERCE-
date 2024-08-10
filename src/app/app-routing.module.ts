import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { AllProductsComponent } from './user/all-products/all-products.component';
import { CategoryComponent } from './user/category/category.component';
import { ProductViewComponent } from './user/product-view/product-view.component';
import { LoginComponent } from './user/login/login.component';
import { CartComponent } from './user/cart/cart.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', component: AllProductsComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'product/:id', component: ProductViewComponent },
      { path: 'cart/:id', component: CartComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
