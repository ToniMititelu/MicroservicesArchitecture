import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateUpdateListingsComponent} from './components/create-update-listings/create-update-listings.component';
import {ListingsComponent} from './components/listings/listings.component';
import {MainComponent} from './components/main/main.component';
import {ListingDetailsComponent} from './components/listing-details/listing-details.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {RegisterComponent} from './components/register/register.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ListingsMineComponent } from './components/listings-mine/listings-mine.component';
import { CreateEditAddressComponent } from './components/create-edit-address/create-edit-address.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { MyOrdersToConfirmComponent } from './components/my-orders-to-confirm/my-orders-to-confirm.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdminGuard } from './guards/admin.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: MainComponent,
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'listings',
    component: ListingsComponent,
  },
  {
    path: 'listings/favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listings/mine',
    component: ListingsMineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listings/create',
    component: CreateUpdateListingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listings/:id/update',
    component: CreateUpdateListingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listings/:id/details',
    component: ListingDetailsComponent,
  },
  {
    path: 'addresses/mine',
    component: AddressesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addresses/create',
    component: CreateEditAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addresses/:id/update',
    component: CreateEditAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/create',
    component: MakeOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/mine',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/mine/confirmation',
    component: MyOrdersToConfirmComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '403',
    component: ForbiddenComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
