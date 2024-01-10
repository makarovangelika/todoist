import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getPriorityOptions } from 'src/app/constants';
import { TaskForm } from 'src/app/models';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent {
  initialDate = this.dynamicDialogConfig.data.task.deadline ? new Date(this.dynamicDialogConfig.data.task.deadline) : null;
  
  editTaskForm: FormGroup<TaskForm> = new FormGroup<TaskForm>({
    description: new FormControl(this.dynamicDialogConfig.data.task.description, Validators.required),
    deadline: new FormControl(this.initialDate),
    priority: new FormControl(this.dynamicDialogConfig.data.task.priority),
    category: new FormControl(this.dynamicDialogConfig.data.task.category)
  });

  minDate = new Date();
  priorities = getPriorityOptions();

  get description() {
    return this.editTaskForm.get('description');
  }
  categories = this.categoryService.getCategories().map(category => {
      return {
        label: category.name,
        value: category
      }
    });

  constructor(public dynamicDialogConfig: DynamicDialogConfig,
              public ref: DynamicDialogRef,
              private categoryService: CategoryService) {}

  saveEditedTask() {
    const updateTaskData = {
      description: this.editTaskForm.value.description,
      deadline: this.editTaskForm.value.deadline,
      priority: this.editTaskForm.value.priority,
      category: this.editTaskForm.value.category
    }
    this.dynamicDialogConfig.data.updateTask(this.dynamicDialogConfig.data.task.id, updateTaskData);
    this.ref.close();
  }
}
