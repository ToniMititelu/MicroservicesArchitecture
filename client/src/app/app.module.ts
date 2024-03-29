import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestAuthComponent } from './components/test-auth/test-auth.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { MainComponent } from './components/main/main.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AvatarModule } from 'primeng/avatar';
import { DataViewModule } from 'primeng/dataview';
import { ListingsComponent } from './components/listings/listings.component';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { CreateUpdateListingsComponent } from './components/create-update-listings/create-update-listings.component';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';
import { GMapModule } from 'primeng/gmap';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { DocumentComponent } from './components/document/document.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ListingsMineComponent } from './components/listings-mine/listings-mine.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GalleriaComponent } from './components/galleria/galleria.component';
import { GalleriaModule } from 'primeng/galleria';
import { CreateEditAddressComponent } from './components/create-edit-address/create-edit-address.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { MyOrdersToConfirmComponent } from './components/my-orders-to-confirm/my-orders-to-confirm.component';
import { ChatComponent } from './components/chat/chat.component';
import { SplitterModule } from 'primeng/splitter';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminListingsComponent } from './components/admin-listings/admin-listings.component';
import { SliderModule } from 'primeng/slider';
import { ProfileComponent } from './components/profile/profile.component';

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
    CreateEditAddressComponent,
    AddressesComponent,
    MyOrdersComponent,
    MyOrdersToConfirmComponent,
    ChatComponent,
    NotFoundComponent,
    ForbiddenComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminOrdersComponent,
    AdminListingsComponent,
    ProfileComponent,
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
        TableModule,
        ToolbarModule,
        ConfirmDialogModule,
        SplitterModule,
        MultiSelectModule,
        SliderModule,
    ],
  providers: [
    RouterLink,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    MessageService,
    ConfirmationService,
    AuthGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
