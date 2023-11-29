import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
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

  constructor(private dynamicDialogConfig: DynamicDialogConfig) {}
}
