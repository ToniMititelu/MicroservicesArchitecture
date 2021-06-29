import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TestAuthComponent} from './components/test-auth/test-auth.component';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule} from '@angular/forms';
import {RippleModule} from 'primeng/ripple';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    TabViewModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ToastModule,
    RippleModule,
    PasswordModule,
    DividerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
