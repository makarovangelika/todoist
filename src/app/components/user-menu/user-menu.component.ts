import { Component, Input, OnInit, WritableSignal, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
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
  @Input() toggleSidebarVisibility: () => void = () => {};
  categories: WritableSignal<Category[]> = signal(this.categoryService.getCategories());
  ref: DynamicDialogRef | undefined;
  menuItems: MenuItem[] | undefined;
  activeCategory!: Category;

  constructor(public userStorageService: UserStorageService,
              private categoryService: CategoryService,
              public dialogService: DialogService,
              private router: Router,
              private confirmationService: ConfirmationService) {
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
          icon: "pi pi-times",
          command: () => {
            this.confirmDelete(this.activeCategory.name);
          }
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

  confirmDelete(categoryName: string) {
    this.confirmationService.confirm({
      message: `Вы уверены, что хотите удалить категорию ${categoryName}?`,
      header: 'Удалить категорию?',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      acceptButtonStyleClass: 'accept-delete-button confirm-delete-button',
      rejectButtonStyleClass: 'confirm-delete-button',
      accept: () => {
        this.deleteCategory(categoryName);
      }
    })
  }

   deleteCategory = (categoryName: string) => {
    this.categories.update(categories => {
      return categories.filter(category => {
        return category.name !== categoryName;
      })
    })
   } 
}
