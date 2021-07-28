import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateUpdateListingsComponent} from './components/create-update-listings/create-update-listings.component';
import {ListingsComponent} from './components/listings/listings.component';
import {MainComponent} from './components/main/main.component';
import {ListingDetailsComponent} from './components/listing-details/listing-details.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {RegisterComponent} from './components/register/register.component';

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
    path: 'listings/create',
    component: CreateUpdateListingsComponent,
  },
  {
    path: 'listings/:id/update',
    component: CreateUpdateListingsComponent,
  },
  {
    path: 'listings/:id/details',
    component: ListingDetailsComponent,
  },
  {
    path: '**',
    component: MainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
