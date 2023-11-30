import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getOptions } from 'src/app/constants';
import { Priority, TaskForm } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';
import { v4 as uuid4 } from "uuid";

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {
  addTaskForm: FormGroup = new FormGroup<TaskForm>({
    description: new FormControl(null, Validators.required),
    deadline: new FormControl(null),
    priority: new FormControl(null),
    category: new FormControl(null)
  });

  get description() {
    return this.addTaskForm.get('description');
  }

  minDate: Date = new Date();
  priorities = getOptions();
  get categories() {
    return this.categoryService.getCategories().map(category => {
      return {
        label: category.name,
        value: category
      }
    })
  }

  constructor(public ref: DynamicDialogRef,
              public dynamicDialogConfig: DynamicDialogConfig,
              private categoryService: CategoryService) {}

  addTask() {
    const task = {
      id: uuid4(),
      done: false,
      description: this.addTaskForm.value.description,
      deadline: this.addTaskForm.value.deadline,
      priority: this.addTaskForm.value.priority || Priority.low,
      category: this.addTaskForm.value.category
    };
    this.dynamicDialogConfig.data.addTask(task);
    this.ref.close();
  }
}
