import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryForm } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';
import { editCategoryNameValidator } from 'src/app/validators';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent {
  editCategoryForm: FormGroup<CategoryForm> = new FormGroup<CategoryForm>({
    name: new FormControl(this.dynamicDialogConfig.data.category.name, [Validators.required, editCategoryNameValidator(this.categoryService.getCategories(), this.dynamicDialogConfig.data.category)])
  });

  get name() {
    return this.editCategoryForm.get('name');
  }

  constructor(public dynamicDialogConfig: DynamicDialogConfig,
              private categoryService: CategoryService,
              public ref: DynamicDialogRef) {}

  saveEditedCategory() {
    const updateCategoryData = {
      name: this.editCategoryForm.value.name
    }
    this.ref.close(updateCategoryData);
  }
}
