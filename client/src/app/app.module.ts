import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PrimeTemplate } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestAuthComponent } from './components/test-auth/test-auth.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TestAuthComponent,
    NavbarComponent,
    LogInComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    TabViewModule,
    ButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
