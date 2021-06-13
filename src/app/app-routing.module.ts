import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CreateComponent } from './pages/create/create.component';
import { GoodsComponent } from './pages/goods/goods.component';
import { ServiceComponent } from './pages/service/service.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { StorecreatorsComponent } from './pages/storecreators/storecreators.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'create', component: CreateComponent },
  { path: 'products', component: GoodsComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'storecreators', component: StorecreatorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
