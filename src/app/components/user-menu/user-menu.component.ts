import { Component, Input, OnInit, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Category } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() sidebarVisible = false;
  @Input() toggleSidebarVisibility!: () => void
  categories: WritableSignal<Category[]> = signal(this.categoryService.getCategories());
  menuItems: MenuItem[] | undefined;

  constructor(public userStorageService: UserStorageService,
              private categoryService: CategoryService,
              private router: Router) {}

  ngOnInit() {
    this.menuItems = [{
      label: "Мои категории",
      items: this.categories().map(category => {
        return { label: category.name }
      })
    }
    ]
  }

  logout() {
    this.userStorageService.logout();
    this.router.navigate(['/login']);
  }
}
