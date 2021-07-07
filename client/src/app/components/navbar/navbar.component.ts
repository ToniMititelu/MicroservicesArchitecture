import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
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
      label: 'Account',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user-edit',
        },
        {
          label: 'Listings',
          icon: 'pi pi-fw pi-tags',
          items: [
            {
              label: 'My listings',
              icon: 'pi pi-fw pi-tags',
            },
            {
              label: 'Create listing',
              icon: 'pi pi-fw pi-plus',
              routerLink: ['listings/create'],
            },
          ],
        },
        {
          label: 'Favorites',
          icon: 'pi pi-fw pi-heart',
        }
      ]
    },
    {
      label: 'Messages',
      icon: 'pi pi-fw pi-envelope'
    },
    {
      label: 'Log Out',
      icon: 'pi pi-fw pi-sign-out',
      command: (event: Event) => this.logOut(),
    },
  ];

  constructor(readonly authService: AuthService,
              readonly localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.items = [
        {
          label: 'Log In',
          icon: 'pi pi-fw pi-sign-in',
          command: (event: Event) => this.logIn(),
        },
        {
          label: 'Register',
          icon: 'pi pi-fw pi-user-plus',
          command: (event: Event) => this.register(),
        },
      ];
    }
  }

  logIn(): void {
    this.showLogIn = true;
  }

  register(): void {
    this.showRegister = true;
  }

  logOut(): void {
    this.localStorageService.clearLocalStorage();
  }

}
