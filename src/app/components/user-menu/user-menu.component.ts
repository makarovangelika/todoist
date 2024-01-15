import { Component, Input, OnInit, Output, WritableSignal, effect, signal, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category, CategoryFormData } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() sidebarVisible = false;
  @Output() readonly sidebarClosed = new EventEmitter();
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
        label: $localize `:@@EDIT:Edit`,
        icon: "pi pi-pencil",
        command: () => {
          this.openEditDialog(this.activeCategory);
        }
      },
      {
        label: $localize `:@@DELETE:Delete`,
        icon: "pi pi-times",
        command: () => {
          this.confirmDelete(this.activeCategory.name);
        }
      }
    ]
  }
  
  toggleSidebarVisibility() {
    this.sidebarClosed.emit();
  }

  logout() {
    this.userStorageService.logout();
    this.router.navigate(['/login']);
  }

  openAddDialog() {
    this.ref = this.dialogService.open(CategoryDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: $localize `:@@ADD_CATEGORY:Add category`,
      data: {
        categoryFormData: {
          name: null
        },
        buttonLabel: $localize `:@@ADD:Add`
      }
    })
    this.ref.onClose.subscribe((categoryFormData: Category) => {
      if (categoryFormData) {
        this.addCategory(categoryFormData);
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
    this.ref = this.dialogService.open(CategoryDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: $localize `:@@EDIT_CATEGORY:Edit category`,
      data: {
        categoryFormData: {
          name: category.name
        },
        buttonLabel: $localize `:@@SAVE:Save`
      }
    })
    this.ref.onClose.subscribe((categoryFormData: CategoryFormData) => {
      if (categoryFormData) {
        this.updateCategory(category.name, categoryFormData);
      }
    })
  }

  updateCategory = (editedCategoryName: string, updateCategoryData: CategoryFormData) => {
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
      message: $localize `:@@ARE_YOU_SURE_YOU_WANT_TO_DELETE_CATEGORY:Are you sure you want to delete category ${categoryName}?`,
      header:$localize `:@@DELETE_CATEGORY:Delete category?`,
      acceptLabel: $localize `:@@DELETE:Delete`,
      rejectLabel: $localize `:@@CANCEL:Cancel`,
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
