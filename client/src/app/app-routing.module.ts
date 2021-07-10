import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateUpdateListingsComponent} from './components/create-update-listings/create-update-listings.component';
import {ListingsComponent} from './components/listings/listings.component';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'listings',
    component: ListingsComponent,
  },
  {
    path: 'listings/create',
    component: CreateUpdateListingsComponent
  },
  {
    path: 'listings/:id/update',
    component: CreateUpdateListingsComponent
  },
  {
    path: '**',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
