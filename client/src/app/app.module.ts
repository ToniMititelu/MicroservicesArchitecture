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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RippleModule} from 'primeng/ripple';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {MainComponent} from './components/main/main.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {AvatarModule} from 'primeng/avatar';
import {DataViewModule} from 'primeng/dataview';
import {ListingsComponent} from './components/listings/listings.component';
import {RatingModule} from 'primeng/rating';
import {DropdownModule} from 'primeng/dropdown';
import {CreateUpdateListingsComponent} from './components/create-update-listings/create-update-listings.component';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {MessageService} from 'primeng/api';
import {InputNumberModule} from 'primeng/inputnumber';
import {RouterLink} from '@angular/router';
import {CarouselComponent} from './components/carousel/carousel.component';
import {CarouselModule} from 'primeng/carousel';
import {ListingDetailsComponent} from './components/listing-details/listing-details.component';
import {GMapModule} from 'primeng/gmap';
import {MakeOrderComponent} from './components/make-order/make-order.component';
import {DocumentComponent} from './components/document/document.component';
import {DocumentListComponent} from './components/document-list/document-list.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ListingsMineComponent } from './components/listings-mine/listings-mine.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GalleriaComponent } from './components/galleria/galleria.component';
import { GalleriaModule } from 'primeng/galleria';

const config: SocketIoConfig = {url: 'http://localhost:8085', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    TestAuthComponent,
    NavbarComponent,
    LogInComponent,
    RegisterComponent,
    MainComponent,
    CategoriesComponent,
    ListingsComponent,
    CreateUpdateListingsComponent,
    CarouselComponent,
    ListingDetailsComponent,
    MakeOrderComponent,
    DocumentComponent,
    DocumentListComponent,
    FavoritesComponent,
    ListingsMineComponent,
    GalleriaComponent,
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
    ReactiveFormsModule,
    ToastModule,
    RippleModule,
    PasswordModule,
    DividerModule,
    AvatarModule,
    DataViewModule,
    RatingModule,
    DropdownModule,
    CardModule,
    InputTextareaModule,
    CheckboxModule,
    FileUploadModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    CarouselModule,
    GMapModule,
    SocketIoModule.forRoot(config),
    ProgressSpinnerModule,
    GalleriaModule,
  ],
  providers: [
    RouterLink,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
