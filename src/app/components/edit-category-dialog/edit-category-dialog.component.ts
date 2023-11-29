import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryForm } from 'src/app/models';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent {
  editCategoryForm: FormGroup = new FormGroup<CategoryForm>({
    name: new FormControl(this.dynamicDialogConfig.data.category.name, Validators.required)
  });

  get name() {
    return this.editCategoryForm.get('name');
  }

  constructor(public dynamicDialogConfig: DynamicDialogConfig,
              public ref: DynamicDialogRef) {}

  saveEditedCategory() {
    const updateCategoryData = {
      name: this.editCategoryForm.value.name
    }
    this.dynamicDialogConfig.data.updateCategory(this.dynamicDialogConfig.data.category.name, updateCategoryData);
    this.ref.close();
  }
}
