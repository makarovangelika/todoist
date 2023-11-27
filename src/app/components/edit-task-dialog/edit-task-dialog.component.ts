import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getOptions } from 'src/app/constants';
import { TaskForm } from 'src/app/models';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent {
  editTaskForm: FormGroup = new FormGroup<TaskForm>({
    description: new FormControl(this.dynamicDialogConfig.data.task.description),
    deadline: new FormControl(this.dynamicDialogConfig.data.task.deadline),
    priority: new FormControl(this.dynamicDialogConfig.data.task.priority)
  });

  minDate = new Date();
  priorities = getOptions();

  constructor(public dynamicDialogConfig: DynamicDialogConfig,
              public ref: DynamicDialogRef) {}

  saveEditedTask() {
    const updateTaskData = {
      description: this.editTaskForm.value.description,
      deadline: this.editTaskForm.value.deadline,
      priority: this.editTaskForm.value.priority
    }
    this.dynamicDialogConfig.data.updateTask(this.dynamicDialogConfig.data.task.id, updateTaskData);
    this.ref.close();
  }
}
