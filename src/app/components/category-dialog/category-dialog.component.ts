import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryForm } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';
import { categoryNameValidator } from 'src/app/validators';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {
  categoryForm: FormGroup<CategoryForm> = new FormGroup<CategoryForm>({
    name: new FormControl(this.dynamicDialogConfig.data.categoryFormData.name, [Validators.required, categoryNameValidator(this.categoryService.getCategories(), this.dynamicDialogConfig.data.categoryFormData)])
  });

  constructor(public ref: DynamicDialogRef,
              public dynamicDialogConfig: DynamicDialogConfig,
              private categoryService: CategoryService) {}

  get name() {
    return this.categoryForm.get('name');
  }

  saveCategoryData() {
    const categoryFormData = {
      name: this.categoryForm.value.name
    }
    this.ref.close(categoryFormData);
  }
}
