import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './commonComponents/header/header.component';
import { FooterComponent } from './commonComponents/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/authorization/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './directives/role.directive';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrdersumaryComponent } from './ordersumary/ordersumary.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'header', component: HeaderComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]},
  {path: 'summary', component: OrdersumaryComponent, canActivate: [AuthGuard]},
  {path: 'user-update/:id', component: UpdateUserComponent, canActivate: [AuthGuard]},
  {path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard]},
  {path: 'manage-product', component: ManageProductComponent, canActivate: [AuthGuard]},
  {path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard]},
  {path: 'categories', component: ManageCategoriesComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RoleDirective,
    ProductComponent,
    ProductDetailsComponent,
    OrdersumaryComponent,
    UpdateUserComponent,
    InventoryComponent,
    ManageProductComponent,
    ManageCategoriesComponent,
    ManageUsersComponent,
    OrdersComponent
  ],
  exports: [RoleDirective],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
