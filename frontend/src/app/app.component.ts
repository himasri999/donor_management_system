import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" *ngIf="authService.isAuthenticated()">
      <div class="container">
        <a class="navbar-brand" href="#">Donor Management</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/donors">Donors</a>
          <a class="nav-link" routerLink="/donations">Donations</a>
          <a class="nav-link" routerLink="/communications">Communications</a>
          <button class="btn btn-outline-light ms-3" (click)="authService.logout()">Logout</button>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}