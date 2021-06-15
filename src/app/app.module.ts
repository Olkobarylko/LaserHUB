import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CreateComponent } from './pages/create/create.component';
import { GoodsComponent } from './pages/goods/goods.component';
import { ServiceComponent } from './pages/service/service.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { StorecreatorsComponent } from './pages/storecreators/storecreators.component';
import { AdminComponent } from './admin/admin.component';
import { BlogsComponent } from './admin/blogs/blogs.component';
import { OutsorcingComponent } from './admin/outsorcing/outsorcing.component';
import { AdmincontactsComponent } from './admin/admincontacts/admincontacts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscoverComponent,
    BlogComponent,
    CreateComponent,
    GoodsComponent,
    ServiceComponent,
    ContactsComponent,
    StorecreatorsComponent,
    AdminComponent,
    BlogsComponent,
    OutsorcingComponent,
    AdmincontactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
