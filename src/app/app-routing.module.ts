import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { GoodsComponent } from './pages/goods/goods.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { StorecreatorsComponent } from './pages/storecreators/storecreators.component';

import { AdminComponent } from './admin/admin.component';
import { BlogsComponent } from './admin/blogs/blogs.component';
import { OutsorcingComponent } from './admin/outsorcing/outsorcing.component';
import { AdmincontactsComponent } from './admin/admincontacts/admincontacts.component';
import { LasercutComponent } from './pages/goods/lasercut/lasercut.component';
import { GardencubeComponent } from './pages/goods/gardencube/gardencube.component';
import { LoftfurnitureComponent } from './pages/goods/loftfurniture/loftfurniture.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductdesriptionComponent } from './pages/productdesription/productdesription.component';
import { BasketComponent } from './pages/basket/basket.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { BlogdescriptionComponent } from './pages/blogdescription/blogdescription.component';
import { GuardGuard } from './shared/guard/guard.guard';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'products', component: GoodsComponent },
  { path: 'lasercut', component: LasercutComponent },
  { path: 'gardencube', component: GardencubeComponent },
  { path: 'loftfurniture', component: LoftfurnitureComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'products/:id', component: ProductdesriptionComponent },
  { path: 'blog/:id', component: BlogdescriptionComponent },

  { path: 'storecreators', component: StorecreatorsComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [GuardGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: '/admin/blog' },
      { path: 'blog', component: BlogsComponent },
      { path: 'ousourcing', component: OutsorcingComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'contacts', component: AdmincontactsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
