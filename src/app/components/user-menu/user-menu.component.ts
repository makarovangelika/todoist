import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  @Input() sidebarVisible = false;

  constructor(public userStorageService: UserStorageService,
              private router: Router) {}

  logout() {
    this.userStorageService.logout();
    this.router.navigate(['/login']);
  }
}
