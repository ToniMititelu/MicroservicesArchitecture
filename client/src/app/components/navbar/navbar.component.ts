import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  showLogIn = false;
  showRegister = false;
  items: MenuItem[];

  constructor(readonly authService: AuthService,
              readonly localStorageService: LocalStorageService,
              readonly router: Router) { }

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
    } else {
      this.items = [];
      const role = this.localStorageService.getItem('role');
      if (role === 'ADMIN') {
        this.items.push({
          label: 'Admin',
          icon: 'pi pi-fw pi-id-card',
          routerLink: ['admin']
        });
      }
      this.items.push(...[
        {
          label: 'Account',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Profile',
              icon: 'pi pi-fw pi-user',
              items: [
                {
                  label: 'Edit profile',
                  icon: 'pi pi-fw pi-user-edit',
                },
                {
                  label: 'My addresses',
                  icon: 'pi pi-fw pi-home',
                  routerLink: ['addresses/mine'],
                }
              ]
            },
            {
              label: 'Orders',
              icon: 'pi pi-fw pi-shopping-cart',
              items: [
                {
                  label: 'My orders',
                  routerLink: ['orders/mine']
                },
                {
                  label: 'Orders for my listings',
                  routerLink: ['orders/mine/confirmation']
                }
              ],
            }
          ]
        },
        {
          label: 'Listings',
          icon: 'pi pi-fw pi-tags',
          items: [
            {
              label: 'All listings',
              icon: 'pi pi-fw pi-tags',
              routerLink: ['listings'],
            },
            {
              label: 'My listings',
              icon: 'pi pi-fw pi-tag',
              routerLink: ['listings/mine'],
            },
            {
              label: 'Favorites',
              icon: 'pi pi-fw pi-heart',
              routerLink: ['listings/favorites'],
            },
            {
              label: 'Create listing',
              icon: 'pi pi-fw pi-plus',
              routerLink: ['listings/create'],
            },
          ],
        },
        {
          label: 'Messages',
          icon: 'pi pi-fw pi-envelope',
          routerLink: ['chat']
        },
        {
          label: 'Log Out',
          icon: 'pi pi-fw pi-sign-out',
          command: (event: Event) => this.logOut(),
        },
      ]);
    }
  }

  logIn(): void {
    this.router.navigate(['log-in']);
  }

  register(): void {
    this.router.navigate(['register']);
  }

  logOut(): void {
    this.localStorageService.clearLocalStorage();
    window.location.href = '/home';
  }

}
