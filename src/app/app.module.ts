import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { GoodsComponent } from './pages/goods/goods.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { StorecreatorsComponent } from './pages/storecreators/storecreators.component';
import { AdminComponent } from './admin/admin.component';
import { BlogsComponent } from './admin/blogs/blogs.component';
import { OutsorcingComponent } from './admin/outsorcing/outsorcing.component';
import { AdmincontactsComponent } from './admin/admincontacts/admincontacts.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { LasercutComponent } from './pages/goods/lasercut/lasercut.component';
import { GardencubeComponent } from './pages/goods/gardencube/gardencube.component';
import { LoftfurnitureComponent } from './pages/goods/loftfurniture/loftfurniture.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductdesriptionComponent } from './pages/productdesription/productdesription.component';
import { BasketComponent } from './pages/basket/basket.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { BlogdescriptionComponent } from './pages/blogdescription/blogdescription.component';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    GoodsComponent,
    ContactsComponent,
    StorecreatorsComponent,
    AdminComponent,
    BlogsComponent,
    OutsorcingComponent,
    AdmincontactsComponent,
    LasercutComponent,
    GardencubeComponent,
    LoftfurnitureComponent,
    ProductsComponent,
    ProductdesriptionComponent,
    BasketComponent,
    OrdersComponent,
    BlogdescriptionComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
