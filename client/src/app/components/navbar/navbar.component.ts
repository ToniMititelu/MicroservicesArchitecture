import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showLogIn = false;
  showRegister = false;

  items: MenuItem[] = [
    {
      label: 'Admin',
      icon: 'pi pi-fw pi-id-card',
      routerLink: 'home'
    },
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
    },
    {
      label: 'Log In',
      icon: 'pi pi-fw pi-sign-in',
      command: this.logIn,
    },
    {
      label: 'Register',
      icon: 'pi pi-fw pi-user-plus',
      command: this.register,
    },
    {
      label: 'Log Out',
      icon: 'pi pi-fw pi-sign-out',
      command: this.logOut,
    }
  ];

  constructor(readonly authService: AuthService,
              readonly localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  logIn() {
    this.showLogIn = true;
  }

  register() {
    this.showRegister = true;
  }

  logOut() {
    this.localStorageService.clearLocalStorage();
  }

}
