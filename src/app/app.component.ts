import { Component } from '@angular/core';
import { UserStorageService } from './services/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todoist';
  sidebarVisible = false;

  constructor(public userStorageService: UserStorageService) {}
}
