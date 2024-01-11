import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getPriorityOptions } from 'src/app/constants';
import { Priority, TaskForm } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  taskForm: FormGroup<TaskForm> = new FormGroup<TaskForm>({
    description: new FormControl(this.dynamicDialogConfig.data.taskFormData.description, Validators.required),
    deadline: new FormControl(this.dynamicDialogConfig.data.taskFormData.deadline),
    priority: new FormControl(this.dynamicDialogConfig.data.taskFormData.priority),
    category: new FormControl(this.dynamicDialogConfig.data.taskFormData.category)
  });

  get description() {
    return this.taskForm.get('description');
  }

  minDate: Date = new Date();
  priorities = getPriorityOptions();
  categories = this.categoryService.getCategories().map(category => {
    return {
      label: category.name,
      value: category
    }
  });

  constructor(public ref: DynamicDialogRef,
              private categoryService: CategoryService,
              public dynamicDialogConfig: DynamicDialogConfig) {}

  saveTaskData() {
    const taskFormData = {
      description: this.taskForm.value.description,
      deadline: this.taskForm.value.deadline,
      priority: this.taskForm.value.priority || Priority.low,
      category: this.taskForm.value.category
    };
    this.ref.close(taskFormData);
  }
}
