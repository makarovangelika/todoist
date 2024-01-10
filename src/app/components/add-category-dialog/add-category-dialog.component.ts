import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryForm } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';
import { categoryNameValidator } from 'src/app/validators';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent {
  addCategoryForm: FormGroup<CategoryForm> = new FormGroup<CategoryForm>({
    name: new FormControl(null, [Validators.required, categoryNameValidator(this.categoryService.getCategories())])
  });

  constructor(public ref: DynamicDialogRef,
              private categoryService: CategoryService) {}

  get name() {
    return this.addCategoryForm.get('name');
  }

  addCategory() {
    const category = {
      name: this.addCategoryForm.value.name
    }
    this.ref.close(category);
  }
}
