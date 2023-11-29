import { Component, Input, OnInit, WritableSignal, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category, UpdateCategoryData } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() sidebarVisible = false;
  @Input() toggleSidebarVisibility!: () => void
  categories: WritableSignal<Category[]> = signal(this.categoryService.getCategories());
  ref: DynamicDialogRef | undefined;
  menuItems: MenuItem[] | undefined;
  activeCategory!: Category;

  constructor(public userStorageService: UserStorageService,
              private categoryService: CategoryService,
              public dialogService: DialogService,
              private router: Router) {
                effect(() => {
                  this.categoryService.updateCategories(this.categories())
                })
              }

    ngOnInit() {
      this.menuItems = [
        {
          label: "Редактировать",
          icon: "pi pi-pencil",
          command: () => {
            this.openEditDialog(this.activeCategory);
          }
        },
        {
          label: "Удалить",
          icon: "pi pi-times"
        }
      ]
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

  openEditDialog(category: Category) {
    this.ref = this.dialogService.open(EditCategoryDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: 'Изменить категорию',
      data: {
        category: category,
        updateCategory: this.updateCategory
      }
    })
  }

  updateCategory = (editedCategoryName: string, updateCategoryData: UpdateCategoryData) => {
    this.categories.update(categories => {
      return categories.map(category => {
        if (category.name === editedCategoryName) {
          category = {
            ...category,
            ...updateCategoryData
          }
        }
        return category;
      })
    })
  }
}
