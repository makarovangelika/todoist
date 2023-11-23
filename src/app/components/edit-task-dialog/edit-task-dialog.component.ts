import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskForm } from 'src/app/models';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent {
  editTaskForm: FormGroup = new FormGroup<TaskForm>({
    description: new FormControl(this.dynamicDialogConfig.data.task.description)
  });

  constructor(public dynamicDialogConfig: DynamicDialogConfig,
              public ref: DynamicDialogRef) {}

  saveEditedTask() {
    const updateTaskData = {
      description: this.editTaskForm.value.description
    }
    this.dynamicDialogConfig.data.updateTask(this.dynamicDialogConfig.data.task.id, updateTaskData);
    this.ref.close();
  }
}
