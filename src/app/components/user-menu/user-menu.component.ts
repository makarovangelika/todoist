import { Component, Input, WritableSignal, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  @Input() sidebarVisible = false;
  @Input() toggleSidebarVisibility!: () => void
  categories: WritableSignal<Category[]> = signal(this.categoryService.getCategories());
  ref: DynamicDialogRef | undefined;

  constructor(public userStorageService: UserStorageService,
              private categoryService: CategoryService,
              public dialogService: DialogService,
              private router: Router) {
                effect(() => {
                  this.categoryService.updateCategories(this.categories())
                })
              }

  logout() {
    this.userStorageService.logout();
    this.router.navigate(['/login']);
  }

  openAddDialog() {
    this.ref = this.dialogService.open(AddCategoryDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: 'Добавить категорию',
      data: {
        addCategory: this.addCategory
      }
    })
  }
  addCategory = (newCategory: Category) => {
    this.categories.update(categories => {
      categories.push(newCategory);
      return categories;
    })
  }
}
