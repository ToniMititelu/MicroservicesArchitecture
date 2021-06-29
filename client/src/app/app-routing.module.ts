import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestAuthComponent } from './components/test-auth/test-auth.component';

const routes: Routes = [
  {
    path: 'home',
    component: TestAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
