import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-logout',
  template: '<div></div>'
})
export class LogoutComponent {
  constructor(private authService: AuthService) {
    this.authService.logout();
  }
}